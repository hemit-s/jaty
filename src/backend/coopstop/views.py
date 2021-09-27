from django.http import JsonResponse
import json
import googlemaps
from coopstop.gcp_key import GCP_KEY

from coopstop.address_info_interface import sample_return_val

def get_address_information(request):

    # json_content = json.loads(request.body)
    # print(json.dumps(json_content, indent=2))

    # destination = json_content["destination"]
    # expected_work_arrival_time = json_content["expected_work_arrival_time"]
    # addresses = json_content["addresses"]
    # get_address_commute_times(addresses, destination, expected_work_arrival_time)

    # for address in json_content["addresses"]:
    #     print("########################")
    #     print(f"Processing {address}")
    #     get_gyms_nearby(address)
    #     get_groceries_nearby(address)
    #     print()

    # print(sample_return_val)

    print(json.dumps(sample_return_val, indent=2))
    return JsonResponse(sample_return_val)

def get_address_commute_times(addresses, destination, expected_work_arrival_time):
    print(f"Getting Commute Times for {addresses} to {destination} by {expected_work_arrival_time}")
    gmaps = googlemaps.Client(key=GCP_KEY)
    data = dict(zip(addresses, [{}]*len(addresses)))
    for travel_mode in ['driving', 'walking', 'transit', 'bicycling']:
        results = gmaps.distance_matrix(origins=addresses, destinations=destination, mode=travel_mode, arrival_time=expected_work_arrival_time)
        outputs = [row.get("elements")[0] for row in results.get("rows")]
        for index, address in enumerate(addresses):
            data.get(address)[travel_mode] = outputs[index]
    return JsonResponse(data)

def get_gyms_nearby(address):
    print(f"Getting Gyms near {address}")
    return JsonResponse({"dummy": "value"})

def get_groceries_nearby(address):
    print(f"Getting Groceries near {address}")
    return JsonResponse({"dummy": "value"})