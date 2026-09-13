from django.urls import path
from . import views

app_name = "content_managerr"

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
    path("banners/", views.banners, name="banners"),
    path("campaigns/", views.campaigns, name="campaigns"),
    path("events/", views.events, name="events"),
    path("events/editor/", views.event_editor, name="event_editor"),
    path("gallery/", views.gallery, name="gallery"),
    path("homepage-content/", views.homepage_content, name="homepage_content"),
    path("media-library/", views.media_library, name="media_library"),
    path("news/", views.news, name="news"),
    path("news/editor/", views.news_editor, name="news_editor"),
    path("stories/", views.stories, name="stories"),
    path("stories/editor/", views.story_editor, name="story_editor"),
]
