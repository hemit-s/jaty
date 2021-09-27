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

# all distances are the same unit (km)
# travel time in minutes
sample_return_val = {

    # "work_travel_distance": "50km",
    "travel_times_to_work": {
        "walking" : 40,
        "biking" : 50,
        "public_transit" : 35,
        "car": 10
    },

    "grocery_locations": [
        {
            "name": "Loblaws",
            "distance" : 1.4,
            # "travel_time" : "4"
        },
        {
            "name": "Food Basics",
            "distance" : 1.5,
            # "travel_time" : "4"
        },
        {
            "name": "Walmart",
            "distance" : 1.6,
            # "travel_time" : "4"
        }
    ],

    "gym_locations":[
        {
            "name": "Goodlife",
            "distance" : 4.2,
            # "travel_time" : "4"
        },
        {
            "name": "Lyft Tingz",
            "distance" : 5.1,
            # "travel_time" : "4"
        },
        {
            "name": "Git Big",
            "distance" : 6.3,
            # "travel_time" : "4"
        }
    ]

}

# requests.get("http://127.0.0.1:8000/get_address_info", json=payload)