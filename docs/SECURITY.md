# Security Documentation - Road1Job

## 🔐 WHY: Security Objectives

Road1Job handles sensitive developer data (CVs, contact info, job history) and must protect against:
- **Authentication attacks** (brute force, credential stuffing)
- **Data breaches** (SQL injection, XSS)
- **Unauthorized access** (CSRF, privilege escalation)
- **API abuse** (rate limiting, DoS)
- **Third-party risks** (OAuth vulnerabilities)

---

## 🛡️ HOW: Implementation Strategy

### 1. **Authentication & Authorization**

#### Mechanism:
- **JWT Tokens**: Access tokens (15 min expiry)
- **Refresh Tokens**: In HTTP-only cookies (7 days expiry)
- **Google OAuth 2.0**: Social auth with Passport.js
- **Password Hashing**: bcrypt + bcryptjs (salt rounds: 10)

#### Implementation Details:
```typescript
// JWT Signing
const token = jwt.sign(
  { userId, email },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Password Hashing
const hash = await bcrypt.hash(password, 10);

// Verification
const isValid = await bcrypt.compare(password, hash);
```

#### Session Management:
- **Secure Cookies**: `HttpOnly`, `Secure`, `SameSite=Strict`
- **Session Storage**: In-memory (upgrade to Redis in production)
- **CORS**: Whitelist frontend origin only

```javascript
// Fastify Cookie Config
{
  secret: process.env.COOKIE_SECRET,
  hook: 'onSend',
  parseOptions: {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'strict'
  }
}
```

---

### 2. **Data Protection**

#### Input Validation:
- Validate all user inputs (email, password, text fields)
- Whitelist allowed characters
- Reject oversized payloads (max 10MB)

```typescript
// Example: Email validation
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Password requirements
const passwordRequirements = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
```

#### SQL Injection Prevention:
- **Using Prisma ORM**: Parameterized queries by default
- All queries use `prisma.model.method()` (not raw SQL)
- Raw SQL (if needed) uses `$1, $2` placeholders

```typescript
// ✅ SAFE: Prisma handles escaping
const user = await prisma.user.findUnique({
  where: { email: userInput }
});

// ❌ NEVER: Raw query concatenation
const query = `SELECT * FROM User WHERE email = '${email}'`;
```

#### Output Encoding:
- JSON responses automatically escaped
- No HTML in JSON bodies
- Content-Type headers set correctly

---

### 3. **Network Security**

#### CORS Configuration:
```typescript
await app.register(cors, {
  origin: process.env.FRONTEND_URL, // Whitelist only
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400
});
```

#### HTTPS/TLS:
- **Development**: HTTP allowed (localhost)
- **Production**: HTTPS mandatory
- **Certificate**: Let's Encrypt (auto-renewed)
- **Minimum TLS**: 1.2

#### Headers Security:
```typescript
// Should add: (install @fastify/helmet)
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Strict-Transport-Security: max-age=31536000
```

---

### 4. **Authentication Flows**

#### Standard Login:
```
User Email/Pass → Hash Comparison → JWT Generated
                                  ↓
                        Secure Cookie Set
                        Token in Response
                                  ↓
                        Browser stores in localStorage
```

#### Google OAuth 2.0:
```
User clicks "Login with Google" → Google OAuth endpoint
                                 ↓
                        User grants permissions
                        ↓
                    Passport validates code
                    ↓
        User created/updated in DB
        ↓
    JWT generated, cookie set
    ↓
Redirect to frontend dashboard
```

#### Protected Endpoints:
```typescript
app.get('/users/:id', 
  { preHandler: authenticateJWT },
  getUserController
);

// Middleware validates token
function authenticateJWT(request, reply) {
  const token = request.headers.authorization?.split(' ')[1];
  if (!token) return reply.code(401).send({ error: 'Unauthorized' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded;
  } catch {
    return reply.code(401).send({ error: 'Invalid token' });
  }
}
```

---

### 5. **API Security**

#### Rate Limiting (To Implement):
```typescript
// Install @fastify/rate-limit
await app.register(rateLimit, {
  max: 100,
  timeWindow: '15 minutes'
});
```

#### Request Size Limits:
```typescript
const app = Fastify({
  bodyLimit: 10485760 // 10MB max
});
```

#### CSRF Protection (To Implement):
```typescript
// Add @fastify/csrf-protection
await app.register(csrfProtection);
```

---

### 6. **OAuth Security**

#### Google OAuth Implementation:
```typescript
// strategy config in passportGoogle.ts
new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: false
}, verifyCallback);

// State parameter: Automatically added by Passport (CSRF protection)
// Nonce parameter: For token validation
```

#### Security Checks:
- ✅ `state` parameter validated (CSRF protection)
- ✅ `scope` limited to: `openid profile email`
- ✅ Callback URL must be HTTPS in production
- ⚠️ Add: Email verification before profile creation

---

### 7. **Database Security**

#### Connection String:
```
postgresql://admin:password@localhost:5432/mydb

Production:
- Use environment variables ONLY
- Never hardcode credentials
- Use IAM authentication if possible (AWS RDS)
- Enable SSL connections: sslmode=require
```

#### Access Control:
```sql
-- Create dedicated DB user for app (non-admin)
CREATE USER road1job_app WITH PASSWORD 'strong_password';
GRANT CONNECT ON DATABASE mydb TO road1job_app;
GRANT USAGE ON SCHEMA public TO road1job_app;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO road1job_app;
```

---

## 📋 Security Checklist

### ✅ Implemented
- [x] JWT authentication
- [x] bcrypt password hashing
- [x] Google OAuth 2.0
- [x] CORS configuration
- [x] Cookie security (HttpOnly, Secure)
- [x] Prisma ORM (SQL injection prevention)
- [x] Input validation middleware
- [x] Session management

### 🔄 To Implement
- [ ] Rate limiting (@fastify/rate-limit)
- [ ] CSRF protection (@fastify/csrf-protection)
- [ ] Security headers (@fastify/helmet)
- [ ] Request ID tracking (for audit logs)
- [ ] API key management (for service-to-service)
- [ ] Email verification on registration
- [ ] Two-factor authentication (2FA)
- [ ] Audit logging (all sensitive actions)
- [ ] API monitoring & alerting
- [ ] Penetration testing


---

## 🚨 Incident Response

### Data Breach Protocol:
1. **Detect**: Monitoring alerts trigger
2. **Isolate**: Immediately take affected service offline
3. **Investigate**: Root cause analysis
4. **Notify**: Affected users (GDPR: 72 hours)
5. **Remediate**: Fix vulnerability + patch
6. **Review**: Post-incident analysis + improvement


---

## 📚 Resources & References

- [OWASP Top 10 2023](https://owasp.org/Top10/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8949)
- [OAuth 2.0 Security](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics)
- [Fastify Security](https://www.fastify.io/docs/latest/Guides/Security/)
- [Prisma Security](https://www.prisma.io/docs/guides/security/securing-your-database)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/sql-security.html)
