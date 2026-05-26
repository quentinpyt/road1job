# API Documentation - Road1Job

Base URL: `http://localhost:3001` (local) | 

## 🔐 Authentication

### JWT Token Flow
1. User registers/logs in → Backend generates JWT
2. Token stored in HTTP-only cookie + localStorage (optional)
3. Subsequent requests include `Authorization: Bearer <token>`
4. Google OAuth 2.0 also supported

### Headers Required
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
Cookie: session=<session_id>
```

---

## 👤 Auth Endpoints

### POST `/login`
Login avec email/password.

**Request:**
```json
{
  "email": "dev@example.com",
  "password": "secure123"
}
```

**Response (200):**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "dev@example.com",
    "name": "John"
  }
}
```

**Errors:**
- `400` - Invalid credentials
- `401` - Unauthorized
- `422` - Validation failed

---

### POST `/register`
Créer un nouvel utilisateur.

**Request:**
```json
{
  "email": "newdev@example.com",
  "password": "secure123",
  "name": "Jane",
  "surname": "Doe"
}
```

**Response (201):**
```json
{
  "id": 2,
  "email": "newdev@example.com",
  "name": "Jane",
  "surname": "Doe",
  "createdAt": "2024-01-15T10:30:00Z"
}
```

**Validation:**
- Email: unique, valid format
- Password: min 8 chars, alphanumeric
- Name: required, string

---

### POST `/logout`
Terminer la session utilisateur.

**Request:** `{}` (empty body)

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

### GET `/auth/google`
Initiates Google OAuth 2.0 flow.

**Redirects to**: Google consent screen

---

### GET `/auth/google/callback`
Google OAuth callback (handled by Passport).

**Response**: Redirect to frontend + JWT token

---

## 💼 Jobs Endpoints

### GET `/getalljob` or `/jobs/search`
Récupère toutes les offres (avec filtrage optionnel).

**Query Parameters:**
```
?skill=React&type=CDI&city=Paris&limit=20&offset=0
```

**Response (200):**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Senior React Developer",
      "descriptionmini": "Build web apps",
      "description": "Full description...",
      "company": "TechCorp",
      "type": "CDI",
      "experience": 3,
      "image": "logo_url",
      "createdAt": "2024-01-10T00:00:00Z",
      "skills": [
        { "id": 1, "name": "React", "value": 4 }
      ],
      "salary": {
        "min": 45000,
        "max": 60000,
        "currency": "EUR"
      },
      "geolocation": {
        "city": "Paris",
        "country": "France",
        "latitude": 48.8566,
        "longitude": 2.3522
      }
    }
  ],
  "total": 150,
  "limit": 20,
  "offset": 0
}
```

---

### GET `/jobs/skills`
Récupère toutes les compétences disponibles.

**Response (200):**
```json
{
  "skills": [
    { "id": 1, "name": "React", "count": 45 },
    { "id": 2, "name": "Python", "count": 38 },
    { "id": 3, "name": "TypeScript", "count": 52 },
    { "id": 4, "name": "DevOps", "count": 23 }
  ]
}
```

---

### GET `/jobs/:id`
Récupère une offre par ID.

**Parameters:**
- `id` (integer, required): Job ID

**Response (200):**
```json
{
  "id": 1,
  "name": "Senior React Developer",
  "descriptionmini": "Build web apps",
  "description": "Full description...",
  "company": "TechCorp",
  "type": "CDI",
  "experience": 3,
  "image": "logo_url",
  "skills": [
    { "id": 1, "name": "React", "value": 4 },
    { "id": 2, "name": "TypeScript", "value": 3 }
  ],
  "salary": {
    "min": 45000,
    "max": 60000,
    "currency": "EUR"
  },
  "geolocation": {
    "city": "Paris",
    "country": "France"
  },
  "analytics": {
    "visitsCount": 150,
    "applyBtnClicks": 25,
    "ctr": 0.16
  }
}
```

**Errors:**
- `404` - Job not found
- `400` - Invalid ID

---

### GET `/jobs/:jobId/compatibility`
Obtient le score de compatibilité (AI service).

**Parameters:**
- `jobId` (integer, required): Job ID

**Response (200):**
```json
{
  "jobId": 1,
  "compatibility_score": 0.87,
  "matching_skills": ["React", "TypeScript"],
  "missing_skills": ["GraphQL"],
  "recommendation": "Good match! You have 87% of required skills."
}
```

**Calls**: AI Service (Python, port 3002)

---

### POST `/jobs`
Créer une nouvelle offre (Admin only).

**Authentication Required**: Yes (JWT)

**Request:**
```json
{
  "name": "Senior Backend Developer",
  "descriptionmini": "Build scalable APIs",
  "description": "We are looking for...",
  "company": "StartupXYZ",
  "type": "CDI",
  "experience": 5,
  "image": "url_to_logo",
  "skills": [
    { "name": "Node.js", "value": 4 },
    { "name": "PostgreSQL", "value": 3 }
  ],
  "salary": {
    "min": 50000,
    "max": 70000,
    "currency": "EUR"
  },
  "geolocation": {
    "city": "Lyon",
    "country": "France",
    "latitude": 45.7640,
    "longitude": 4.8357
  }
}
```

**Response (201):**
```json
{
  "id": 102,
  "name": "Senior Backend Developer",
  "createdAt": "2024-01-15T14:30:00Z"
}
```

---

### PUT `/jobs/:id`
Mettre à jour une offre.

**Authentication Required**: Yes (Admin only)

**Parameters:**
- `id` (integer, required): Job ID

**Request:** Same structure as POST

**Response (200):**
```json
{
  "id": 102,
  "message": "Job updated successfully"
}
```

**Errors:**
- `403` - Not authorized
- `404` - Job not found

---

### DELETE `/jobs/:id`
Supprimer une offre.

**Authentication Required**: Yes (Admin only)

**Parameters:**
- `id` (integer, required): Job ID

**Response (204):** No content

**Errors:**
- `403` - Not authorized
- `404` - Job not found

---

## 👥 Users Endpoints

### GET `/users/:id`
Récupère le profil utilisateur.

**Authentication Required**: Yes

**Response (200):**
```json
{
  "id": 1,
  "email": "dev@example.com",
  "name": "John",
  "surname": "Doe",
  "age": 28,
  "address": "123 Dev Street, Paris",
  "Schools": "[\"Epitech\", \"42\"]",
  "Projects": "[\"Project1\", \"Project2\"]",
  "Technologies": "[\"React\", \"Node.js\"]",
  "Skills": "[\"Frontend\", \"Backend\"]",
  "createdAt": "2023-06-01T00:00:00Z"
}
```

---

### PUT `/users/:id`
Mettre à jour le profil utilisateur.

**Authentication Required**: Yes (own profile only)

**Request:**
```json
{
  "name": "John",
  "age": 29,
  "Technologies": "[\"React\", \"Vue\", \"Node.js\"]",
  "Skills": "[\"Frontend\", \"Backend\", \"DevOps\"]"
}
```

**Response (200):**
```json
{
  "id": 1,
  "message": "Profile updated successfully"
}
```

---

### DELETE `/users/:id`
Supprimer un compte utilisateur.

**Authentication Required**: Yes (own account only)

**Response (204):** No content

---

## 📊 Analytics

**Auto-tracked:**
- `visitsCount` - Each GET /jobs/:id
- `applyBtnClicks` - Frontend event tracking
- `ctr` - Calculated: clicks/views
- Updated in real-time via backend webhooks

---

## 🔄 Rate Limiting (Future)

```
- 100 requests/minute per IP (public endpoints)
- 1000 requests/minute per user (authenticated)
- Burst limit: 200 requests in 10 seconds
```

---

## ❌ Error Codes

| Code | Description |
|------|-------------|
| `400` | Bad Request - Invalid parameters |
| `401` | Unauthorized - Missing/invalid token |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `422` | Unprocessable Entity - Validation failed |
| `429` | Too Many Requests - Rate limited |
| `500` | Internal Server Error |
| `503` | Service Unavailable - DB down |

**Error Response Format:**
```json
{
  "error": "User not found",
  "code": "NOT_FOUND",
  "statusCode": 404,
  "timestamp": "2024-01-15T14:30:00Z"
}
```

---

## 📈 Swagger/OpenAPI (To Implement)

Currently not auto-documented. Add `@fastify/swagger`:

```bash
npm install @fastify/swagger @fastify/swagger-ui
```

Will be available at `/documentation` once configured.
