import os
import logging
from dotenv import load_dotenv

load_dotenv()

BASE_URL = os.environ.get("BASE_URL", "").strip()
API_TOKEN = os.environ.get("API_TOKEN", "").strip()

if not BASE_URL:
    logging.error("BASE_URL manquant dans les variables d'environnement.")
    raise EnvironmentError("BASE_URL manquant.")
if not API_TOKEN:
    logging.error("API_TOKEN manquant dans les variables d'environnement.")
    raise EnvironmentError("API_TOKEN manquant.")

headers = {
    "X-API-Key": API_TOKEN,  # Utilisation de la variable d'environnement pour le token
    "Accept": "application/json"  # Indique que nous attendons une réponse JSON
}