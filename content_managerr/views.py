from django.shortcuts import render


def dashboard(request):
    return render(request, "content-manager/dashboard.html")


def banners(request):
    return render(request, "content-manager/banners.html")


def campaigns(request):
    return render(request, "content-manager/campaigns.html")


def events(request):
    return render(request, "content-manager/events.html")


def event_editor(request):
    return render(request, "content-manager/event-editor.html")


def gallery(request):
    return render(request, "content-manager/gallery.html")


def homepage_content(request):
    return render(request, "content-manager/homepage-content.html")


def media_library(request):
    return render(request, "content-manager/media-library.html")


def news(request):
    return render(request, "content-manager/news.html")


def news_editor(request):
    return render(request, "content-manager/news-editor.html")


def stories(request):
    return render(request, "content-manager/stories.html")


def story_editor(request):
    return render(request, "content-manager/story-editor.html")
