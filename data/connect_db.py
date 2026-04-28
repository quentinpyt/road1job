import json
import logging
from pymongo import MongoClient

logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s') # Configuration du logging pour afficher les messages d'information et d'erreur

try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["jobaggregator"]
    offers_collection = db["offers"]
    users_collection = db["users"]
    roles_collection = db["roles"]

    # Insertion des rôles de base
    roles = [
        {"name": "user"},
        {"name": "admin"}
    ]
    roles_result = roles_collection.insert_many(roles)
    logging.info(f"{len(roles_result.inserted_ids)} rôles insérés dans MongoDB.")

    # Insertion d'utilisateurs exemples
    users = [
        {
            "username": "alice",
            "email": "alice@example.com",
            "password_hash": "hashed_password1",
            "role_id": roles_result.inserted_ids[0]
        },
        {
            "username": "bob",
            "email": "bob@example.com",
            "password_hash": "hashed_password2",
            "role_id": roles_result.inserted_ids[1]
        }
    ]
    users_result = users_collection.insert_many(users)
    logging.info(f"{len(users_result.inserted_ids)} utilisateurs insérés dans MongoDB.")

    # Insertion des offres
    with open("result.json", encoding="utf-8") as f:
        offers = json.load(f)

    if offers:
        offers_result = offers_collection.insert_many(offers)
        logging.info(f"{len(offers_result.inserted_ids)} offres insérées dans MongoDB.")
    else:
        logging.warning("Aucune offre à insérer dans MongoDB.")


except Exception as e:
    logging.error(f"Erreur lors de l'initialisation de la base de données : {e}")
    offers_collection.insert_many(offers)
    print(f"{len(offers)} offres insérées dans MongoDB.")
else:
    print("Aucune offre à insérer.")