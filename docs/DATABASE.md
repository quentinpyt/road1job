# Database Schema - Road1Job

## 📋 Entity Relationship Diagram (ERD)

```
┌──────────────┐           ┌─────────────┐
│    User      │           │     Job     │
├──────────────┤           ├─────────────┤
│ id (PK)      │           │ id (PK)     │
│ email (UQ)   │           │ name        │
│ passwordhash │           │ description │
│ name         │           │ company     │
│ surname      │           │ type        │
│ age          │           │ experience  │
│ address      │           │ image       │
│ Schools      │           │ createdAt   │
│ Projects     │           │ updatedAt   │
│ Technologies │           │             │
│ Skills       │           │             │
│ createdAt    │           │             │
└──────────────┘           └─────────────┘
                                 │
                    ┌────────────┼────────────┐
                    │            │            │
              ┌─────▼────┐  ┌────▼─────┐  ┌──▼──────────┐
              │ Skills   │  │Analytics │  │GeoLocation  │
              ├──────────┤  ├──────────┤  ├─────────────┤
              │id (PK)   │  │id (PK)   │  │id (PK)      │
              │name      │  │applic    │  │latitude     │
              │value     │  │applyBtn  │  │longitude    │
              │jobId (FK)│  │atsApp    │  │city         │
              │          │  │cta       │  │country      │
              └──────────┘  │ctr       │  │jobId (FK-UQ)│
                            │remote    │  └─────────────┘
                            │total     │
                            │visits    │  ┌──────────────┐
                            │jobId(FK) │  │   Salary     │
                            └──────────┘  ├──────────────┤
                                          │id (PK)       │
                                          │min           │
                                          │max           │
                                          │currency      │
                                          │jobId (FK-UQ) │
                                          └──────────────┘
```

## 📊 Tables Detailed

### **User**
Profils des développeurs/recruteurs.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Identifiant unique |
| email | STRING | UNIQUE, NOT NULL | Email de connexion |
| passwordhash | STRING | NOT NULL | Password hashé (bcrypt) |
| name | STRING | NULLABLE | Prénom |
| surname | STRING | NULLABLE | Nom |
| age | INTEGER | NULLABLE | Âge |
| address | STRING | NULLABLE | Adresse |
| Schools | STRING | NULLABLE | Écoles (JSON stored as string) |
| Projects | STRING | NULLABLE | Projets (JSON stored as string) |
| Technologies | STRING | NULLABLE | Stack tech (JSON stored as string) |
| Skills | STRING | NULLABLE | Compétences (JSON stored as string) |
| createdAt | TIMESTAMP | DEFAULT now() | Date de création |

**Indexes**: 
- `email` (UNIQUE)
- `id` (PRIMARY KEY)

---

### **Job**
Offres d'emploi agrégées.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | ID unique offre |
| name | STRING | NOT NULL | Titre du poste |
| descriptionmini | STRING | NOT NULL | Résumé court |
| description | STRING | NOT NULL | Détails complets |
| company | STRING | NOT NULL | Nom entreprise |
| type | STRING | NOT NULL | Type (CDI, CDD, Stage, etc) |
| experience | INTEGER | NULLABLE | Années d'expérience requises |
| image | STRING | NULLABLE | Logo/image entreprise |
| createdAt | TIMESTAMP | DEFAULT now() | Date indexation |
| updatedAt | TIMESTAMP | DEFAULT now() | Dernière maj |

**Relationships**:
- 1→many: Skills
- 1→1: Analytics
- 1→1: GeoLocation
- 1→1: Salary

**Indexes**:
- `id` (PRIMARY KEY)
- `company` (for filtering)
- `type` (for filtering)

---

### **Skills**
Compétences requises pour chaque offre.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Identifiant |
| name | STRING | NULLABLE | Nom technologie (React, Python, etc) |
| value | INTEGER | NULLABLE | Niveau requis (1-5) |
| jobId | INTEGER | FK (Job.id) | Référence l'offre |

**Cascade**: DELETE (supprime si job supprimée)

---

### **Analytics**
Métriques d'engagement par offre.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Identifiant |
| applications | INTEGER | DEFAULT 0 | Nombre candidatures |
| applyBtnClicks | INTEGER | DEFAULT 0 | Clics sur "Postuler" |
| atsApplications | INTEGER | DEFAULT 0 | Candidatures via ATS |
| cta | FLOAT | DEFAULT 0 | Call-to-Action rate |
| ctr | FLOAT | DEFAULT 0 | Click-Through Rate |
| remoteApplications | INTEGER | DEFAULT 0 | Candidatures remote |
| totalApplications | INTEGER | DEFAULT 0 | Total candidatures |
| visitsCount | INTEGER | DEFAULT 0 | Vues offre |
| updatedAt | TIMESTAMP | DEFAULT now() | Dernière mise à jour |
| jobId | INTEGER | FK-UQ | 1-1 relation à Job |

**Cascade**: DELETE (supprime si job supprimée)

---

### **GeoLocation**
Données de localisation des offres.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Identifiant |
| latitude | FLOAT | DEFAULT 0 | Latitude |
| longitude | FLOAT | DEFAULT 0 | Longitude |
| city | STRING | NULLABLE | Ville |
| country | STRING | NULLABLE | Pays |
| jobId | INTEGER | FK-UQ | 1-1 relation à Job |

**Cascade**: DELETE (supprime si job supprimée)

---

### **Salary**
Fourchette salariale par offre.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | INTEGER | PK, AUTO_INCREMENT | Identifiant |
| min | INTEGER | NOT NULL | Salaire min (€/k) |
| max | INTEGER | NOT NULL | Salaire max (€/k) |
| currency | STRING | NULLABLE | Devise (EUR, USD, etc) |
| jobId | INTEGER | FK-UQ | 1-1 relation à Job |

**Cascade**: DELETE (supprime si job supprimée)

---

## 🔍 Database Queries

### Common Queries

**Find jobs by location:**
```sql
SELECT j.* FROM "Job" j
JOIN "GeoLocation" g ON j.id = g."jobId"
WHERE g.city = 'Paris' OR g.country = 'France';
```

**Most viewed jobs:**
```sql
SELECT j.*, a."visitsCount" FROM "Job" j
JOIN "Analytics" a ON j.id = a."jobId"
ORDER BY a."visitsCount" DESC LIMIT 10;
```

**Jobs by skill:**
```sql
SELECT DISTINCT j.* FROM "Job" j
JOIN "Skills" s ON j.id = s."jobId"
WHERE s.name = 'React' OR s.name = 'TypeScript';
```

**User with all job applications:**
```sql
SELECT u.*, j.name as applied_job
FROM "User" u
LEFT JOIN (SELECT * FROM "Analytics" WHERE applications > 0) a
ON u.id = a."jobId"
LEFT JOIN "Job" j ON a."jobId" = j.id;
```

## 🔧 Migration & Seeding

**Current Prisma Setup:**
- Generator: `@prisma/client` → output: `../generated/prisma`
- Datasource: PostgreSQL
- Migrations located: `Backend/prisma/migrations/`

**Development Workflow:**
```bash
# Create migration
npx prisma migrate dev --name add_new_feature

# Apply migrations
npx prisma migrate deploy

# Reset DB (dev only)
npx prisma migrate reset

# Seed data
npx tsx prisma/seeds.ts
```

## 📈 Performance Optimization

1. **Indexes to add** (future):
   - `Job(company)` - Filter by company
   - `Job(type)` - Filter by job type
   - `Skills(name)` - Search by technology
   - `Analytics(jobId, visitsCount)` - Analytics queries

2. **Query optimization**:
   - Use `select()` to fetch only needed fields
   - Batch queries when possible
   - Cache frequently accessed data

3. **Archival Strategy**:
   - Archive old jobs (>1 year) to separate table
   - Maintain analytics separately for performance
