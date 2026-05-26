# Architectural Decisions - Road1Job

## Overview
This document captures key architectural decisions across 7 domains for Road1Job. Each decision follows: **WHY** (business/tech reason), **HOW** (implementation approach), **TRADEOFF** (what we gave up).

---

## 1️⃣ Backend Framework: Fastify vs Express vs Nestjs

### ✅ Decision: **Fastify**

### WHY
- **Performance**: ~2x faster than Express (benchmarks)
- **Type-safe**: Built-in TypeScript support
- **Plugin system**: Modular architecture (auth, CORS, session)
- **Lightweight**: Lower memory footprint for job aggregation workload
- **Async-first**: Native async/await (Promises instead of callbacks)

### HOW
```typescript
// Fastify setup
import Fastify from 'fastify';
const app = Fastify();

// Plugin registration pattern
await app.register(cors);
await app.register(authRoutes);
await app.register(jobRoutes);
```

### TRADEOFF
- **Smaller ecosystem**: Less middleware than Express (but growing)
- **Learning curve**: Different mental model than Express
- **Maturity**: Newer framework (Express is battle-tested for 10+ years)

### Alternatives Considered:
- ❌ **Express**: Slower, callback-heavy, dated patterns
- ❌ **NestJS**: Over-engineered for current scope, slower DX

---

## 2️⃣ Database: PostgreSQL with Prisma ORM

### ✅ Decision: **PostgreSQL 16 + Prisma 7**

### WHY
- **Type safety**: Prisma generates TypeScript types from schema
- **Relational data**: Job aggregation naturally relational (Users → Jobs → Skills)
- **ACID compliance**: Data integrity critical for analytics
- **JSON support**: Flexible fields (Schools, Technologies as JSON)
- **Performance**: Indexing, query optimization, replication
- **Developer UX**: Prisma eliminates boilerplate SQL

### HOW
```prisma
// type-safe queries
const job = await prisma.job.findUnique({
  where: { id: 1 },
  include: { skills: true, salary: true }
});
```

### TRADEOFF
- **Not schemaless**: Can't rapidly pivot data models (but that's good for production)
- **Prisma overhead**: Extra abstraction layer (minimal performance impact)
- **Vendor lock-in**: Tied to PostgreSQL (less flexible than MongoDB for polyglot strategy)

### Alternatives Considered:
- ❌ **MongoDB**: NoSQL overkill, analytics harder, lacks ACID
- ❌ **Raw SQL**: Eliminates type safety, error-prone
- ❌ **Supabase**: PostgreSQL wrapper, adds complexity

---

## 3️⃣ Authentication: JWT + OAuth 2.0 vs Sessions

### ✅ Decision: **JWT tokens + HTTP-only cookies + Google OAuth 2.0**

### WHY
- **Stateless**: No server-side session storage (scales horizontally)
- **Mobile-friendly**: Tokens work with native apps (future)
- **Social login**: Google OAuth reduces user friction (40% conversion uplift)
- **Security**: HTTP-only prevents XSS theft; SameSite prevents CSRF
- **Flexibility**: Can issue different token types (access, refresh)

### HOW
```typescript
// Auth flow
1. User login → validate email/password → hash check
2. Generate JWT (15min) + Refresh token (7 days)
3. Store refresh in HTTP-only cookie
4. Return access token in response
5. Protected endpoints check Authorization header

// OAuth flow
User → Google consent → callback → Passport validation
→ Create/update user in DB → Issue JWT
```

### TRADEOFF
- **Token revocation**: No immediate way to revoke (must use blacklist)
- **Token size**: JWT adds ~500 bytes per request
- **Privacy**: Google knows user logged in (acceptable trade)
- **Implementation**: More complex than simple sessions

### Alternatives Considered:
- ❌ **Sessions only**: Server stateful, doesn't scale to microservices
- ❌ **API keys**: No social login integration, weak UX
- ❌ **OAuth without JWT**: Token management harder

---

## 4️⃣ Frontend Framework: Next.js vs React SPA vs Vue

### ✅ Decision: **Next.js 14 (App Router)**

### WHY
- **SSR/SSG**: Job listings pre-rendered (SEO crucial for discovery)
- **API routes**: Backend available at `/api/*` (rapid prototyping)
- **Type safety**: Full-stack TypeScript
- **Image optimization**: Auto-resize for job logos
- **Deployment**: Vercel one-click, edge functions
- **DX**: File-based routing, built-in CSS modules

### HOW
```typescript
// app/jobs/page.tsx
export async function generateMetadata({ searchParams }) {
  return { title: `Jobs - ${searchParams.skill}` };
}

export default async function JobsPage() {
  const jobs = await fetchJobs(searchParams);
  return <JobGrid jobs={jobs} />;
}
```

### TRADEOFF
- **Full-page reloads**: Slightly slower navigation vs pure SPA
- **Server bundle**: Heavier deployments
- **Node.js dependency**: Can't deploy on static CDN

### Alternatives Considered:
- ❌ **React SPA**: No SSR = poor SEO for job listings
- ❌ **Vue**: Smaller ecosystem, Next.js has better tooling

---

## 5️⃣ Job Scraping & Aggregation: Puppeteer + Background Jobs vs Serverless

### ✅ Decision: **Puppeteer (headless browser) + Cron jobs (Docker container)**

### WHY
- **JavaScript rendering**: Many job boards use JS (can't scrape with curl)
- **Browser automation**: Handles login, pagination, dynamic content
- **Container-based**: Cron jobs run in Docker (scalable)
- **Cost-effective**: No serverless pricing overhead
- **Retry logic**: Built-in error handling + backoff

### HOW
```typescript
// Backend cron job (runs via node-cron or similar)
1. Every 6 hours: Call LinkedIn, Indeed, Stack Overflow APIs
2. Puppeteer for JS-heavy sites
3. Parse HTML with Cheerio
4. Normalize data (title, description, salary)
5. Store/update in PostgreSQL
6. Track last-scraped timestamp
```

### TRADEOFF
- **Memory intensive**: Puppeteer uses ~100MB per instance
- **Slow**: Browser automation slower than API calls (~5sec per page)
- **Headless limitations**: Some sites detect automation
- **Maintenance**: Site structure changes break scraping

### Alternatives Considered:
- ✅ **APIs (preferred)**: LinkedIn, GitHub APIs → implement next
- ❌ **Serverless**: AWS Lambda timeout (15min), cold start overhead
- ❌ **Selenium**: Slower, more fragile than Puppeteer

---

## 6️⃣ AI/Compatibility Scoring: Microservice vs Inline Python

### ✅ Decision: **Separate Python microservice (port 3002)**

### WHY
- **Decoupling**: AI logic separate from API (independent scaling)
- **Language flexibility**: Python best for ML/NLP libraries
- **Scaling**: Can run multiple instances for heavy computations
- **Maintenance**: Data science team can own independently
- **Docker**: Easy deployment (already containerized)

### HOW
```
Frontend → Fastify (/jobs/:id/compatibility)
            ↓
        AI Service
        (port 3002)
        ↓
    TensorFlow/sklearn
    Similarity scoring
    ↓
    Response sent back
```

### TRADEOFF
- **Network latency**: Inter-service calls add 50-100ms
- **Complexity**: More moving parts to monitor
- **Failure modes**: AI service down = compatibility endpoint fails

### Alternatives Considered:
- ❌ **Inline**: Would require Node.js ML libraries (immature)
- ❌ **Separate REST API**: Already doing this ✅

---

## 7️⃣ Infrastructure & Deployment: Docker Compose vs Kubernetes vs Serverless

### ✅ Decision: **Docker Compose (dev) → Kubernetes (production)**

### WHY
- **Local DX**: Docker Compose one-command setup (npm install + docker compose up)
- **Parity**: Dev environment mirrors production
- **Future K8s**: Services already containerized (easy migration)
- **Cost**: No vendor lock-in (AWS, GCP, self-hosted all work)
- **Scaling**: Horizontal pod autoscaling when needed

### HOW
```yaml
# docker-compose.yml
services:
  db: postgres:16
  backend: Fastify (3001)
  frontend: Next.js (3000)
  ai-service: Python (3002)

# Production (Kubernetes)
apiVersion: apps/v1
kind: Deployment
metadata:
  name: backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: backend
```

### TRADEOFF
- **Ops overhead**: Need DevOps engineer for production K8s
- **Resource management**: Must tune CPU/memory requests
- **Monitoring**: Need prometheus + grafana setup

### Alternatives Considered:
- ❌ **Serverless (Lambda)**: Cold starts, vendor lock-in, DB connection pooling hard
- ❌ **Traditional VMs**: Manual scaling, higher ops burden

---

## Cross-Cutting Decisions

### Error Handling Strategy
- **Structured logging**: JSON logs (correlate via request ID)
- **HTTP status codes**: RESTful conventions (4xx client, 5xx server)
- **No generic 500**: Always return `{ error, code, statusCode, timestamp }`

### API Versioning
- **URL versioning**: `/api/v1/jobs` (not header-based)
- **Deprecation**: 6-month notice before removing v1

### Monitoring & Observability
- **Logs**: ELK stack or CloudWatch
- **Metrics**: Prometheus → Grafana
- **Traces**: Jaeger for distributed tracing (future)

### Testing Strategy
- **Unit**: Jest for business logic
- **Integration**: Database fixtures
- **E2E**: Playwright for critical flows


## Future Reconsiderations

- **Cache layer**: Add Redis when API bottleneck found
- **Message queue**: Bull/RabbitMQ for async job processing
- **CDN**: Cloudflare for static assets + DDoS protection
- **Database replication**: Read replicas for analytics workload
