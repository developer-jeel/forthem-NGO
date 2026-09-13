from django.shortcuts import render


def dashboard(request):
    return render(request, "rescue-manager/dashboard.html")


def cases(request):
    return render(request, "rescue-manager/cases.html")


def incidents(request):
    return render(request, "rescue-manager/incidents.html")


def incident_detail(request, incident_id):
    return render(request, "rescue-manager/incident-detail.html")


def incident_new(request):
    return render(request, "rescue-manager/incident-new.html")


def dispatch(request):
    return render(request, "rescue-manager/dispatch.html")


def medical_records(request):
    return render(request, "rescue-manager/medical-records.html")


def resources(request):
    return render(request, "rescue-manager/resources.html")


def volunteers(request):
    return render(request, "rescue-manager/volunteers.html")


def fund_requests(request):
    return render(request, "rescue-manager/fund-requests.html")


def fund_request_new(request):
    return render(request, "rescue-manager/fund-request-new.html")


def index(request):
    return render(request, "rescue-manager/index.html")


def command_center(request):
    return render(request, "rescue-manager/command-center.html")
