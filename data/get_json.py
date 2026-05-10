
import json
import requests
import time
from dotenv import load_dotenv
import os
load_dotenv()

header = {
    "X-API-Key": os.getenv("API-KEY")
}
def get_json():
    page = "0"
    data_json = []
    while True:
        url = f"https://epi-api.welovedevs.com/v1?page={page}&size=100"
        response = requests.get(url, headers=header)
        if response.status_code == 200:
            data = response.json()
            if not data.get('values'):
                print("No more data.")
                break
            for item in data.get('values'):
                data_json.extend([item])
            page = str(int(page) + 1)
            time.sleep(10)
        else:
            print(f"Failed to retrieve data. Status code: {response.status_code}")
    with open('data.json', 'a+') as json_file:
        json.dump(data_json, json_file, indent=4)
    print("Data has been written to data.json")

def legnth(name_json):
    with open(name_json, 'r') as json_file:
        data = json.load(json_file)
        print(f"Length of {name_json}: {len(data)}")

if __name__ == "__main__":  
    get_json()
    legnth('data.json')