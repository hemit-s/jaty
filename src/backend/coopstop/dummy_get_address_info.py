import requests

payload = {
    "addresses": [
        "address1",
        "address2",
        "address3",
        "address4",
        "address5",
    ],
    "destination": "destination",
    "expected_work_arrival_time": 5000
}

requests.get("http://127.0.0.1:8000/get_address_info", json=payload)