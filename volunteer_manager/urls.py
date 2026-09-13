from django.urls import path
from . import views

app_name = "volunteer_manager"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("volunteers/", views.volunteers, name="volunteers"),
    path("volunteers/<int:volunteer_id>/", views.volunteer_profile, name="volunteer_profile"),
    path("applications/", views.applications, name="applications"),
    path("applications/<int:application_id>/", views.application_detail, name="application_detail"),
    path("assignments/", views.assignments, name="assignments"),
    path("attendance/", views.attendance, name="attendance"),
    path("broadcast/", views.broadcast, name="broadcast"),
    path("fund-requests/", views.fund_requests, name="fund_requests"),
    path("shifts/", views.shifts, name="shifts"),
]
