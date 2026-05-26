# Architecture - Road1Job

## 🏗️ System Overview

Road1Job est une plateforme d'agrégation d'offres d'emploi avec une architecture **microservices légère** composée de 4 services principaux :

```
┌─────────────────┐
│   Frontend      │
│   Next.js 3000  │
└────────┬────────┘
         │
┌────────▼────────────────┐
│   Backend API           │
│   Fastify 3001          │
│   - Auth (JWT + OAuth)  │
│   - Jobs CRUD           │
│   - Users & Analytics   │
└────────┬────────────────┘
         │
    ┌────┴──────┬──────────┐
    │            │          │
┌───▼───┐  ┌────▼─────┐  ┌─▼──────────┐
│  DB   │  │ AI Svc   │  │  External  │
│ Pg 5  │  │ Python   │  │  APIs &    │
│       │  │ 3002     │  │  Scraping  │
└───────┘  └──────────┘  └────────────┘
```

## 🔧 Tech Stack

| Layer | Technology | Version | Role |
|-------|-----------|---------|------|
| **Frontend** | Next.js | 14+ | UI, Client-side rendering |
| **Backend** | Fastify | 5.8 | API Gateway, Business Logic |
| **ORM** | Prisma | 7.8 | Database Abstraction |
| **DB** | PostgreSQL | 16 | Primary Data Store |
| **Auth** | Passport.js + JWT | 4.0 | Authentication & Authorization |
| **AI/ML** | Python (Flask/FastAPI) | 3.9+ | Compatibility Scoring |
| **Container** | Docker Compose | - | Local Development |

## 📦 Services

### 1. **Frontend (road1job_next)**
- **Port**: 3000
- **Framework**: Next.js
- **Key Features**:
  - Dashboard de recherche d'offres
  - Profil utilisateur
  - Favoris (wishlist)
  - Intégration Google OAuth
  - Responsive UI

### 2. **Backend (Backend)**
- **Port**: 3001
- **Framework**: Fastify
- **Key Features**:
  - REST API
  - Session management via cookies
  - Google OAuth integration
  - CORS configuration
  - Job aggregation endpoints
  - User management
  - Analytics tracking

### 3. **Database**
- **Port**: 5432
- **Type**: PostgreSQL
- **Credentials**: admin/password (dev only)
- **DB Name**: mydb
- **Data Models**:
  - Users (developers)
  - Jobs (aggregated offers)
  - Analytics (usage tracking)
  - GeoLocation (job location data)
  - Salary ranges
  - Skills required

### 4. **AI Service**
- **Port**: 3002
- **Language**: Python
- **Purpose**: 
  - Skill compatibility scoring
  - Job recommendations
  - User profile matching

## 🔗 Data Flow

```
Scraping/APIs → Normalization → Database
                                    ↓
                            Backend API
                            ↓
                    ┌──────────┼──────────┐
                    │          │          │
                Frontend   Analytics  AI Service
                    ↓
                Developer
```

## 🔐 Security Architecture

- **Auth**: JWT tokens + Session cookies
- **CORS**: Restricted to frontend origin
- **OAuth**: Google OAuth 2.0 for social auth
- **Password**: bcrypt hashing (bcryptjs)
- **HTTPS**: Ready (configure in production)

## 📊 Scalability Considerations

1. **Database**: Indexed on `jobId`, `email` for performance
2. **Caching**: Redis layer (optional future)
3. **Job Queue**: Bull/Nest (for batch scraping)
4. **CDN**: Cloudflare/AWS CloudFront for frontend
5. **API Rate Limiting**: Implement in production
6. **Database Replication**: PostgreSQL streaming replication

## 🚀 Deployment Strategy

### Development
- Docker Compose for local environment
- Hot reload on code changes
- Development credentials in `.env`

### Staging
- Kubernetes (optional)
- Separate DB instance
- Staging credentials

### Production
- Containerized deployment (Docker/K8s)
- RDS PostgreSQL instance
- CDN for static assets
- Monitoring & alerting setup
