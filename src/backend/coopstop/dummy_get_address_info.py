import requests

payload = {
    "addresses": [
        "address1",
        "address2",
        "address3",
        "address4",
        "address5",
    ],
    "work_address ": "work_address",
    # assuming arrive at 9
    # assume leave at 5
    # "expected_work_arrival_time": 5000
}

return_val = {

    # "work_travel_distance": "50km",
    "travel_times_to_work": {
        "walking" : "40m",
        "biking" : "55m",
        "public_transit" : "35m",
        "car": "10m"
    },

    "grocery_locations": [
        {
            "name": "Loblaws",
            "distance" : "4km",
            # "travel_time" : "4m"
        },
        {
            "name": "Food Basics",
            "distance" : "5km",
            # "travel_time" : "4m"
        },
        {
            "name": "Walmart",
            "distance" : "6km",
            # "travel_time" : "4m"
        }
    ],

    "gym_locations":[
        {
            "name": "Goodlife",
            "distance" : "4km",
            # "travel_time" : "4m"
        },
        {
            "name": "Lyft Tingz",
            "distance" : "5km",
            # "travel_time" : "4m"
        },
        {
            "name": "Git Big",
            "distance" : "6km",
            # "travel_time" : "4m"
        }
    ]

}

requests.get("http://127.0.0.1:8000/get_address_info", json=payload)