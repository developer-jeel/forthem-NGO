from django.db.models import Max
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib import messages

from content_managerr.models import *

global uid
uid = {'name' : 'bhadu' , 'email' : "bhadu@gmaial.com"}

def dashboard(request):
    published_count = story.objects.filter(status='published').count()
    draft_count = story.objects.filter(status='draft').count()
    total_stories = story.objects.count()
    return render(request, "content-manager/dashboard.html", {
        "uid": uid,
        "published_stories_count": published_count,
        "draft_stories_count": draft_count,
        "total_stories_count": total_stories,
    })


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


def _handle_story_save(request):
    title = request.POST.get("title", "").strip()
    content = request.POST.get("content", "").strip()

    if not title or not content:
        messages.error(request, "Story title and content body are required.")
        return None

    max_no = story.objects.aggregate(max_story_no=Max("story_no"))["max_story_no"] or 0
    is_featured = request.POST.get("is_featured") in ["on", "true", "True", True, "1"]

    new_story = story.objects.create(
        story_no=max_no + 1,
        title=title,
        content=content,
        type=request.POST.get("type", "success"),
        status=request.POST.get("status", "draft"),
        image=request.FILES.get("image"),
        author=request.POST.get("author", "").strip() or None,
        city=request.POST.get("city", "").strip() or None,
        state=request.POST.get("state", "").strip() or None,
        instagram_link=request.POST.get("instagram_link", "").strip() or None,
        youtube_link=request.POST.get("youtube_link", "").strip() or None,
        facebook_link=request.POST.get("facebook_link", "").strip() or None,
        is_featured=is_featured,
    )
    messages.success(request, f"Story '{new_story.title}' saved successfully.")
    return new_story


def stories(request):
    if request.method == "POST":
        _handle_story_save(request)
        return redirect("content_managerr:stories")

    return render(request, "content-manager/stories.html", {
        "stories": story.objects.order_by("-created_at"),
        "type_choices": story.type_choices,
        "status_choices": story.status_choices,
    })


def story_editor(request, story_id=None):
    story_obj = get_object_or_404(story, pk=story_id) if story_id else None

    if request.method == "POST":
        title = request.POST.get("title", "").strip()
        content = request.POST.get("content", "").strip()

        if not title or not content:
            messages.error(request, "Story title and content body are required.")
            return render(request, "content-manager/story-editor.html", {
                "type_choices": story.type_choices,
                "status_choices": story.status_choices,
                "story_obj": story_obj,
                "form_data": request.POST,
            })

        is_featured = request.POST.get("is_featured") in ["on", "true", "True", True, "1"]

        if story_obj:
            story_obj.title = title
            story_obj.content = content
            story_obj.type = request.POST.get("type", story_obj.type)
            story_obj.status = request.POST.get("status", story_obj.status)
            if request.FILES.get("image"):
                story_obj.image = request.FILES.get("image")
            story_obj.author = request.POST.get("author", "").strip() or None
            story_obj.city = request.POST.get("city", "").strip() or None
            story_obj.state = request.POST.get("state", "").strip() or None
            story_obj.instagram_link = request.POST.get("instagram_link", "").strip() or None
            story_obj.youtube_link = request.POST.get("youtube_link", "").strip() or None
            story_obj.facebook_link = request.POST.get("facebook_link", "").strip() or None
            story_obj.is_featured = is_featured
            story_obj.save()
            messages.success(request, f"Story '{story_obj.title}' updated successfully.")
        else:
            max_no = story.objects.aggregate(max_story_no=Max("story_no"))["max_story_no"] or 0
            new_story = story.objects.create(
                story_no=max_no + 1,
                title=title,
                content=content,
                type=request.POST.get("type", "success"),
                status=request.POST.get("status", "draft"),
                image=request.FILES.get("image"),
                author=request.POST.get("author", "").strip() or None,
                city=request.POST.get("city", "").strip() or None,
                state=request.POST.get("state", "").strip() or None,
                instagram_link=request.POST.get("instagram_link", "").strip() or None,
                youtube_link=request.POST.get("youtube_link", "").strip() or None,
                facebook_link=request.POST.get("facebook_link", "").strip() or None,
                is_featured=is_featured,
            )
            messages.success(request, f"Story '{new_story.title}' created successfully.")

        return redirect("content_managerr:stories")

    return render(request, "content-manager/story-editor.html", {
        "type_choices": story.type_choices,
        "status_choices": story.status_choices,
        "story_obj": story_obj,
    })


def delete_story(request, story_id):
    story_obj = get_object_or_404(story, pk=story_id)
    story_title = story_obj.title
    story_obj.delete()
    messages.success(request, f"Story '{story_title}' deleted successfully.")
    return redirect("content_managerr:stories")


