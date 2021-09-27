from django.http import JsonResponse
import json
import googlemaps
from coopstop.gcp_key import GCP_KEY

def get_address_information(request):

    json_content = json.loads(request.body)
    print(json.dumps(json_content, indent=2))

    destination = json_content["destination"]
    expected_work_arrival_time = json_content["expected_work_arrival_time"]
    addresses = json_content["addresses"]

    for address in json_content["addresses"]:
        print("########################")
        print(f"Processing {address}")
        get_address_commute_times(address, destination, expected_work_arrival_time)
        get_gyms_nearby(address)
        get_groceries_nearby(address)
        print()

    return JsonResponse({"key1": "value1", "key2": "value2"})

def get_address_commute_times(address, destination, expected_work_arrival_time):
    print(f"Getting Commute Times for {address} to {destination} by {expected_work_arrival_time}")
    gmaps = googlemaps.Client(key=GCP_KEY)
    data = {}
    for travel_mode in ['driving', 'walking', 'transit', 'bicycling']:
        results = gmaps.distance_matrix(origins=address, destinations=destination, mode=travel_mode, arrival_time=expected_work_arrival_time)
        outputs = results.get('rows')[0].get("elements")[0]
        data[travel_mode] = outputs
    return data

def get_address_coordinates(address):
    gmaps = googlemaps.Client(key=GCP_KEY)
    result = gmaps.geocode(address)
    coordinates = result[0].get('geometry').get('location')
    return coordinates

def get_gyms_nearby(address):
    print(f"Getting Gyms near {address}")
    return JsonResponse({"dummy": "value"})

def get_groceries_nearby(address):
    print(f"Getting Groceries near {address}")
    return JsonResponse({"dummy": "value"})