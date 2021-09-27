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

    for address in addresses:
        print("########################")
        print(f"Processing {address}")
        get_address_commute_times(address, destination, expected_work_arrival_time, ['driving', 'walking', 'transit', 'bicycling'])
        get_type_nearby(address, "gym")
        get_type_nearby(address, "supermarket")
        print()

    return JsonResponse({"key1": "value1", "key2": "value2"})

def get_address_commute_times(address, destination, expected_work_arrival_time, travel_modes):
    print(f"Getting Commute Times for {address} to {destination} by {expected_work_arrival_time}")
    gmaps = googlemaps.Client(key=GCP_KEY)
    data = {}
    for travel_mode in travel_modes:
        results = gmaps.distance_matrix(origins=address, destinations=destination, mode=travel_mode, arrival_time=expected_work_arrival_time)
        outputs = results.get('rows')[0].get("elements")[0]
        data[travel_mode] = outputs
    return data

def get_address_coordinates(address):
    gmaps = googlemaps.Client(key=GCP_KEY)
    result = gmaps.geocode(address)
    coordinates = result[0].get('geometry').get('location')
    return coordinates

# google maps specified type
# https://developers.google.com/maps/documentation/places/web-service/supported_types
def get_type_nearby(address, type):
    print(f"Getting {type} near {address}")
    
    radius = "1000"
    
    address_coordinates = get_address_coordinates(address)
    gmaps = googlemaps.Client(key=GCP_KEY)
    response = gmaps.places_nearby(location=address_coordinates, radius=radius, type=type)

    place_ids = [place["place_id"] for place in response["results"]]
    place_distances = [get_address_commute_times(address, f"place_id:{place_id}", None, ["driving"])["driving"]["distance"]["text"] for place_id in place_ids]

    place_list = []
    for index, place in enumerate(response["results"]):
        place_list.append({
            "name" : place["name"],
            "distance" : place_distances[index]
        })

    return JsonResponse(place_list)
