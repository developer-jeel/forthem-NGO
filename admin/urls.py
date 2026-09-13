from django.urls import path
from . import views

app_name = "admin_panel"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("activity/", views.activity, name="activity"),
    path("users/", views.admin_users, name="admin_users"),
    path("animals/", views.animals, name="animals"),
    path("animal-profile/", views.animal_profile, name="animal_profile"),
    path("banners/", views.banners, name="banners"),
    path("campaigns/", views.campaigns, name="campaigns"),
    path("campaigns/<int:campaign_id>/", views.campaign_detail, name="campaign_detail"),
    path("content/", views.content, name="content"),
    path("donations/", views.donations, name="donations"),
    path("donations/<int:donation_id>/", views.donation_detail, name="donation_detail"),
    path("donors/", views.donors, name="donors"),
    path("donors/<int:donor_id>/", views.donor_profile, name="donor_profile"),
    path("events/", views.events, name="events"),
    path("events/<int:event_id>/", views.event_detail, name="event_detail"),
    path("gallery/", views.gallery, name="gallery"),
    path("messages/", views.messages, name="messages"),
    path("notifications/", views.notifications, name="notifications"),
    path("operations/", views.operations, name="operations"),
    path("reports/", views.reports, name="reports"),
    path("roles/", views.roles, name="roles"),
    path("settings/", views.settings, name="settings"),
    path("stories/", views.stories, name="stories"),
    path("tasks/", views.tasks, name="tasks"),
    path("login/", views.login, name="login"),
    path("volunteers/", views.volunteers, name="volunteers"),
    path("volunteers/<int:volunteer_id>/", views.volunteer_profile, name="volunteer_profile"),
]
