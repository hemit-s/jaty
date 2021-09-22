from django.http import JsonResponse
import json


def get_address_information(request):

    json_content = json.loads(request.body)
    print(json.dumps(json_content, indent=2))

    destination = json_content["destination"]
    expected_work_arrival_time = json_content["expected_work_arrival_time"]

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
    return JsonResponse({"car": 5, "bus": 10})

def get_gyms_nearby(address):
    print(f"Getting Gyms near {address}")
    return JsonResponse({"dummy": "value"})

def get_groceries_nearby(address):
    print(f"Getting Groceries near {address}")
    return JsonResponse({"dummy": "value"})