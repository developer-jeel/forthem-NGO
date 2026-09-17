from django.shortcuts import redirect, render
from django.contrib import messages

from content_managerr.models import *


def dashboard(request):
    return render(request, "content-manager/dashboard.html")


def banners(request):
    banner_list = Banner.objects.all()
    return render(request, "content-manager/banners.html", {"banner_list": banner_list})


def edit_banner(request, banner_id):
    banner = Banner.objects.get(id=banner_id)

    if request.method == "POST":
        banner.page = request.POST.get('page', banner.page)
        banner.title = request.POST.get('title', banner.title)
        banner.content = request.POST.get('content', banner.content)
        banner.is_active = 'is_active' in request.POST

        image = request.FILES.get('image')
        if image:
            banner.image = image

        banner.save()
        messages.success(request, f"'{banner.title}' banner updated successfully.")
        return redirect('content_managerr:banners')

    return render(request, "content-manager/banners.html", {"banner_list": Banner.objects.all(), "selected_banner": banner})


def campaigns(request):
    return render(request, "content-manager/campaigns.html")


def events(request):
    return render(request, "content-manager/events.html")


def event_editor(request):
    return render(request, "content-manager/event-editor.html")


def gallery(request):
    return render(request, "content-manager/gallery.html")


def homepage_content(request):
    content, _ = HomePageContent.objects.get_or_create(pk=1)

    if request.method == "POST":
        editable_fields = (
            'hero_heading', 'hero_subheading', 'primary_cta_label', 'primary_cta_url',
            'secondary_cta_label', 'secondary_cta_url', 'stat1_number', 'stat1_label',
            'stat2_number', 'stat2_label', 'stat3_number', 'stat3_label',
            'stat4_number', 'stat4_label', 'featured_campaigns_heading',
        )
        for field in editable_fields:
            setattr(content, field, request.POST.get(field, '').strip())
        content.stats_visible = 'stats_visible' in request.POST
        content.featured_campaigns_visible = 'featured_campaigns_visible' in request.POST
        content.save()
        messages.success(request, "Homepage content updated successfully.")
        return redirect('content_managerr:homepage_content')

    return render(request, "content-manager/homepage-content.html", {"homepage_content": content})


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
