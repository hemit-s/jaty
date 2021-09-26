import datetime
import json

def get_waterloo_example(json=False):

	addresses = [
		"242 Albert St, Waterloo, ON",
		"64 Balsam St, Waterloo, ON",
		"296 Hemlock St, Waterloo, ON",
		"20 Barrel Yards Blvd #1, Waterloo, ON",
		"140 Iroquois Pl, Waterloo, ON"
	]

	destination = "200 University Ave W, Waterloo, ON"

	expected_work_arrival_time = datetime.datetime(2021, 9, 26, 9)

	travel_mode = "transit"

	params = {
		"origins": addresses,
		"destinations": destination, 
		"arrival_time": expected_work_arrival_time, 
		"mode": travel_mode
	}

	return json.dumps(params) if json else params