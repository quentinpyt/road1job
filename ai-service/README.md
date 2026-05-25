# AI Compatibility Service

Service Python utilisant FastAPI et scikit-learn pour calculer la compatibilité entre les compétences de l'utilisateur et celles requises par un emploi.

## Installation

```bash
# Créer un environnement virtuel
python3 -m venv venv
source venv/bin/activate  # sur Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
```

## Utilisation

### Démarrage local

```bash
python main.py
```

Le service sera disponible sur `http://localhost:3002`

### Avec Docker

```bash
docker build -t ai-service .
docker run -p 3002:3002 ai-service
```

### Docker Compose (avec tout le projet)

```bash
docker-compose up
```

## Endpoints

### POST `/calculate-compatibility`

Calcule la compatibilité entre les compétences d'un utilisateur et celles requises par un emploi.

**Request:**
```json
{
  "user_skills": "Python, JavaScript, React, Node.js",
  "job_skills": [
    {"name": "Python"},
    {"name": "JavaScript"},
    {"name": "Docker"}
  ]
}
```

**Response:**
```json
{
  "score": 75,
  "user_skills_count": 4,
  "job_skills_count": 3,
  "matched_skills": ["python", "javascript"]
}
```

### GET `/health`

Vérifier que le service est opérationnel.

**Response:**
```json
{
  "status": "ok"
}
```

## Comment ça fonctionne

Le calcul de compatibilité utilise :
1. **TF-IDF (Term Frequency-Inverse Document Frequency)** - Analyse la similarité entre les textes des compétences (50%)
2. **Exact Match** - Compte les correspondances exactes ou partielles (50%)

Le score final est une combinaison de ces deux méthodes, retourné en pourcentage (0-100).
