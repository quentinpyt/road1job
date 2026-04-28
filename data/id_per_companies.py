import requests
import json
from normalize import normalize_offer
from api import BASE_URL, headers
import time

skip = 0 # Nombre d'offres déjà récupérées (pagination)
companies = {} # Dictionnaire pour stocker les entreprises uniques (id -> nom)
normalized_offers = [] # Liste pour stocker les offres normalisées

while True:
    params = { # Paramètres de la requête pour la pagination
        "skip": skip
    }

    response = requests.get(BASE_URL, headers=headers, params=params) # Requête GET à l'API avec les en-têtes et les paramètres de pagination

    if response.status_code != 200:
        print("Erreur API :", response.status_code)
        print("Contenu brut :", repr(response.text))
        break

    data = response.json()
    jobs = data.get("values", [])
    total = data.get("totalCount", 0)


    if not jobs:
        print("Fin : plus de données")
        break


    for job in jobs:
        company = job.get("smallCompany")
        if not company:
            continue

        cid = company.get("id")
        cname = company.get("companyName")

        if cid and cname:
            companies[cid] = cname

        # Ajout de l'offre normalisée
        normalized_offers.append(normalize_offer(job))
    time.sleep(1)  # Respecte la limite de 1 requête/seconde
    skip += len(jobs)

    if skip >= total:
        print("Fin : toutes les données récupérées")
        break

# Résultat final trié pour companies.json
result = sorted(
    [{"company_id": k, "company_name": v} for k, v in companies.items()], # Conversion du dictionnaire en liste de dicts
    key=lambda x: x["company_name"].lower()# lambda est une fonction anonyme utilisée pour extraire la clé de tri (le nom de l'entreprise en minuscules)
)

with open("companies.json", "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

with open("result.json", "w", encoding="utf-8") as f:
    json.dump(normalized_offers, f, indent=2, ensure_ascii=False)