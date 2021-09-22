from django.http import HttpResponse
import datetime

def get_address_information(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)