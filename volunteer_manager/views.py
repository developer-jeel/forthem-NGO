from django.shortcuts import render


def dashboard(request):
    return render(request, "volunteer-manager/dashboard.html")


def volunteers(request):
    return render(request, "volunteer-manager/volunteers.html")


def volunteer_profile(request, volunteer_id):
    return render(request, "volunteer-manager/volunteer-profile.html")


def applications(request):
    return render(request, "volunteer-manager/applications.html")


def application_detail(request, application_id):
    return render(request, "volunteer-manager/application-detail.html")


def assignments(request):
    return render(request, "volunteer-manager/assignments.html")


def attendance(request):
    return render(request, "volunteer-manager/attendance.html")


def broadcast(request):
    return render(request, "volunteer-manager/broadcast.html")


def fund_requests(request):
    return render(request, "volunteer-manager/fund-requests.html")


def shifts(request):
    return render(request, "volunteer-manager/shifts.html")


def index(request):
    return render(request, "volunteer-manager/index.html")
