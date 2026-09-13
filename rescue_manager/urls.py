from django.urls import path
from . import views

app_name = "rescue_manager"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("cases/", views.cases, name="cases"),
    path("incidents/", views.incidents, name="incidents"),
    path("incidents/<int:incident_id>/", views.incident_detail, name="incident_detail"),
    path("incidents/new/", views.incident_new, name="incident_new"),
    path("dispatch/", views.dispatch, name="dispatch"),
    path("medical-records/", views.medical_records, name="medical_records"),
    path("resources/", views.resources, name="resources"),
    path("volunteers/", views.volunteers, name="volunteers"),
    path("fund-requests/", views.fund_requests, name="fund_requests"),
    path("fund-requests/new/", views.fund_request_new, name="fund_request_new"),
]
