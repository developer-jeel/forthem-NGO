from django.urls import path
from . import views

app_name = "campaign_manager"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("campaigns/", views.campaigns, name="campaigns"),
    path("campaigns/new/", views.campaign_new, name="campaign_new"),
    path("campaigns/<int:campaign_id>/", views.campaign_detail, name="campaign_detail"),
    path("campaigns/<int:campaign_id>/edit/", views.campaign_edit, name="campaign_edit"),
    path("budget/", views.budget, name="budget"),
    path("donors/", views.donors, name="donors"),
    path("fund-requests/new/", views.fund_request_new, name="fund_request_new"),
    path("impact/", views.impact, name="impact"),
    path("reports/", views.reports, name="reports"),
    path("updates/", views.updates, name="updates"),
]
