import logging
import sys
from api import BASE_URL, headers
from normalize import normalize_offer
import requests
from pymongo import MongoClient

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

def fetch_offers():
    offers = []
    skip = 0
    while True:
        params = {"skip": skip}
        try:
            response = requests.get(BASE_URL, headers=headers, params=params)
            response.raise_for_status()
        except Exception as e:
            logging.error(f"Erreur lors de la récupération des offres : {e}")
            break
        data = response.json()
        jobs = data.get("values", [])
        if not jobs:
            break
        offers.extend(jobs)
        skip += len(jobs)
        if skip >= data.get("totalCount", 0):
            break
    logging.info(f"{len(offers)} offres récupérées.")
    return offers

def normalize_offers(offers):
    normalized = []
    for job in offers:
        try:
            normalized.append(normalize_offer(job))
        except Exception as e:
            logging.warning(f"Erreur de normalisation pour une offre : {e}")
    logging.info(f"{len(normalized)} offres normalisées.")
    return normalized

def insert_offers_to_mongo(offers):
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client["jobaggregator"]
        offers_collection = db["offers"]
        result = offers_collection.insert_many(offers)
        logging.info(f"{len(result.inserted_ids)} offres insérées dans MongoDB.")
    except Exception as e:
        logging.error(f"Erreur d'insertion dans MongoDB : {e}")

def main():
    offers = fetch_offers()
    if not offers:
        logging.error("Aucune offre récupérée. Arrêt du script.")
        return
    normalized = normalize_offers(offers)
    if not normalized:
        logging.error("Aucune offre normalisée. Arrêt du script.")
        return
    insert_offers_to_mongo(normalized)

if __name__ == "__main__":
    main()
