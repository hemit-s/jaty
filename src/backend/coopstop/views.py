from django.http import JsonResponse

def get_address_information(request):
    return JsonResponse({"key1": "value1", "key2": "value2"})
    