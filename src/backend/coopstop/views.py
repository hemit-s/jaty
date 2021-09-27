from datetime import datetime
from django.http import JsonResponse
import json
import googlemaps
from coopstop.gcp_key import GCP_KEY


def get_address_information(request):
    """
    Endpoint to retrieve information regarding commute times to work, nearby gyms and grocery stores and times to
    commute to them in any number of ways
    
    :param request: Must contain two main values: 'destination' mapped to single street address for work
                    and 'addresses' mapped to a list of addresses to be considered for commute times and nearby gyms and groceries
    :type request: JSON string
    """

    json_content = json.loads(request.body)
    print(json.dumps(json_content, indent=2))

    destination = json_content["destination"]
    addresses = json_content["addresses"]

    data = dict(zip(addresses, [{}]*len(addresses)))
    for address in addresses:
        print("########################")
        print(f"Processing {address}")
        data.get(address).update(get_address_commute_times(address, destination))
        data.get(address).update(get_type_nearby(address, "gym"))
        data.get(address).update(get_type_nearby(address, "supermarket"))
        print()

    return JsonResponse(data)


def get_address_commute_times(address, destination, arrival_time=datetime.datetime(2021, 9, 26, 9), travel_modes=['driving', 'walking', 'transit', 'bicycling']):
    """
    Finds the distance and duration of commutes from the given address to destination for all travel modes in the list,
    additionally incorporating provided arrival time.

    :param address: The address of the listing or location in the format: street address, city, province/state, country
    :type address: string

    :param destination: The address of the destination (work address) in the same format as above
    :type destination: string

    :param expected_work_arrival_time: Time of arrival necessary for work with date
    :type expected_work_arrival_time: datetime

    :param travel_modes: A combination of any of 'driving', 'walking', 'transit', or 'bicycling'
    :type travel_modes: list

    :rtype: A dictionary mapping the travel modes to their distances and durations (both text and values in metres and seconds)
    """
    print(f"Getting Commute Times for {address} to {destination} by {arrival_time}")
    gmaps = googlemaps.Client(key=GCP_KEY)
    data = {}
    for travel_mode in travel_modes:
        results = gmaps.distance_matrix(origins=address, destinations=destination, mode=travel_mode, arrival_time=arrival_time)
        outputs = results.get('rows')[0].get("elements")[0]
        data[travel_mode] = outputs
    return data


def get_address_coordinates(address):
    """
    Returns the lat/lng coordinates of a provided street address

    :param address: The address of the listing or location in the format: street address, city, province/state, country
    :type address: string

    :rtype: dictionary mapping lat and lng to float values
    """
    gmaps = googlemaps.Client(key=GCP_KEY)
    result = gmaps.geocode(address)
    coordinates = result[0].get('geometry').get('location')
    return coordinates


# 
def get_type_nearby(address, type):
    """
    Returns a list of places of the given type within 1km radius around the provided address along with the times needed
    to commute to them by driving, transiting, walking or bicycling

    :param address: The address of the listing or location in the format: street address, city, province/state, country
    :type address: string

    :param type: Type of place to be searched for. List of google maps specified types: 
                 https://developers.google.com/maps/documentation/places/web-service/supported_types
    :type type: string

    :rtype: dictionary mapping place type to another dictionary with place names and commute information
    """
    print(f"Getting {type} near {address}")
    
    radius = "1000"
    
    address_coordinates = get_address_coordinates(address)
    gmaps = googlemaps.Client(key=GCP_KEY)
    response = gmaps.places_nearby(location=address_coordinates, radius=radius, type=type)

    place_ids = [place["place_id"] for place in response["results"]]
    place_distances = [get_address_commute_times(address, f"place_id:{place_id}", None) for place_id in place_ids]

    place_list = []
    for index, place in enumerate(response["results"]):
        place_list.append({
            "name" : place["name"],
            "commutes" : place_distances[index]
        })

    return {type: place_list}
