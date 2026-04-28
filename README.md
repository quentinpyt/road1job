# Rode1Job - Agrégateur d'offres d'emploi

## Structure du projet

- **backend/** : Contient le serveur Node.js, la configuration Prisma et les scripts de synchronisation.
  - `server.js` : Serveur principal de l'API backend.
  - `package.json` : Dépendances et scripts Node.js.
  - `prisma/` : Schéma Prisma et migrations SQL.
  - `scripts/sync_mongo_to_sql.js` : Script de synchronisation des données MongoDB vers SQL.
- **data/** : Scripts Python et fichiers de données pour la collecte et la normalisation.
  - `api.py` : Script d'appel aux APIs d'offres d'emploi.
  - `connect_db.py` : Connexion à la base de données MongoDB.
  - `normalize.py` : Normalisation des données collectées.
  - `id_per_companies.py` : Gestion des identifiants par entreprise.
  - `companies.json` : Liste des entreprises.
  - `result.json` : Résultat des traitements.
- **requirement.txt** : Dépendances Python nécessaires pour les scripts du dossier `data/`.

## Installation

### Prérequis

- Node.js (recommandé : v18+)
- Python 3.8+
- MongoDB et une base SQL compatible Prisma (ex : PostgreSQL)

### Backend (Node.js)

1. Rendez-vous dans le dossier `backend/` :

   ```bash
   cd backend
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Configurez Prisma et la base de données selon vos besoins.

4. Lancez le serveur :

   ```bash
   node server.js
   ```

### Scripts Python

1. Créez et activez un environnement virtuel Python :

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

2. Installez les dépendances :

   ```bash
   pip install -r requirement.txt
   ```

3. Exécutez les scripts nécessaires dans le dossier `data/`.

## Synchronisation MongoDB → SQL

Le script `backend/scripts/sync_mongo_to_sql.js` permet de synchroniser les données collectées en MongoDB vers la base SQL via Prisma.

## Auteurs

- Projet réalisé par l'équipe de Rode1Job
