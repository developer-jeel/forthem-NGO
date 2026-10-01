from django.shortcuts import get_object_or_404, redirect, render
from login.views import check_login
from content_managerr.models import Banner, HomePageContent, numbers, story,About, about_team 
from content_managerr.models import *
from adoption_dept.models import *
from admin.models import about_partners


def home(request):
    home_banner = Banner.objects.filter(page='home', is_active=True).first()
    homepage_content, _ = HomePageContent.objects.get_or_create(pk=1)
    numbers_data = numbers.objects.first()
    featured_stories = story.objects.filter(status='published').order_by('-created_at')[:3]
    return render(request, "public-temp/index.html", {
        "home_banner": home_banner,
        "homepage_content": homepage_content,
        "numbers_data": numbers_data,
        "featured_stories": featured_stories,
    })


def about(request):
    about_banner = Banner.objects.filter(page='about', is_active=True).first()
    about_content = About.objects.first()
    team_members = about_team.objects.all()
    journey_entries = about_journey.objects.all().order_by('year')
    about_partner = about_partners.objects.all()
    about_storys = about_story.objects.first()
    return render(request, "public-temp/about.html", {"about_banner": about_banner,"about_content": about_content,"team_members": team_members, "journey_entries": journey_entries, "about_partners": about_partner, "about_storys": about_storys})    


def campaigns(request):
    campaigns_banner = Banner.objects.filter(page='campaigns', is_active=True).first()
    return render(request, "public-temp/campaigns.html", {"campaigns_banner": campaigns_banner})


def campaign_detail(request, campaign_id):
    return render(request, "public-temp/campaign-detail.html")


def campaign_donate(request):
    return render(request, "public-temp/campaign-donate.html")


def donate(request):
    donate_banner = Banner.objects.filter(page='donate', is_active=True).first()
    return render(request, "public-temp/donate.html", {"donate_banner": donate_banner})


def donate_confirmation(request):
    return render(request, "public-temp/donate-confirmation.html")


def events(request):
    return render(request, "public-temp/events.html")


def event_detail(request, event_id):
    return render(request, "public-temp/event-detail.html")


def gallery(request):
    return render(request, "public-temp/gallery.html")


def impact(request):
    impact_banner = Banner.objects.filter(page='impact', is_active=True).first()
    return render(request, "public-temp/impact.html", {"impact_banner": impact_banner})


def login(request):
    return redirect("login:login")

def news(request):
    return render(request, "public-temp/news.html")


def news_detail(request, news_id):
    return render(request, "public-temp/news-detail.html")


def stories(request):
    stories_banner = Banner.objects.filter(page='stories', is_active=True).first()
    published_stories = story.objects.filter(status='published').order_by('-created_at')
    featured_story = published_stories.filter(is_featured=True).first() or published_stories.first()
    return render(request, "public-temp/stories.html", {
        "stories_banner": stories_banner,
        "stories": published_stories,
        "featured_story": featured_story,
    })


def story_detail(request, story_id):
    story_item = story.objects.filter(id=story_id).first()
    return render(request, "public-temp/story-detail.html", {
        "story": story_item,
    })



def volunteer(request):
    volunteer_banner = Banner.objects.filter(page='volunteer', is_active=True).first()
    return render(request, "public-temp/volunteer.html", {"volunteer_banner": volunteer_banner})


def contact(request):
    contact_banner = Banner.objects.filter(page='contact', is_active=True).first()
    return render(request, "public-temp/contact.html", {"contact_banner": contact_banner})


def faq(request):
    faq_banner = Banner.objects.filter(page='faq', is_active=True).first()
    return render(request, "public-temp/faq.html", {"faq_banner": faq_banner})

def privacy_policy(request):
    privacy_policy_banner = Banner.objects.filter(page='privacy_policy', is_active=True).first()
    return render(request, "public-temp/privacy-policy.html", {"privacy_policy_banner": privacy_policy_banner})


def terms(request):
    terms_banner = Banner.objects.filter(page='terms', is_active=True).first()
    return render(request, "public-temp/terms.html", {"terms_banner": terms_banner})


def transparency(request):
    transparency_banner = Banner.objects.filter(page='transparency', is_active=True).first()
    return render(request, "public-temp/transparency.html", {"transparency_banner": transparency_banner})


def adopt(request):
    adopt_banner = Banner.objects.filter(page='adopt', is_active=True).first()
    animal_detail = animal_details.objects.filter(available_for_adoption=True)
    return render(request, "public-temp/adopt.html", {"adopt_banner": adopt_banner, "animals": animal_detail})    


def adopt_detail(request,pk):
    animal = get_object_or_404(animal_details.objects.select_related("animal"), pk=pk)
    animal = get_object_or_404(animal_details.objects.select_related("animal"), pk=pk)
    related_animals = animal_details.objects.select_related("animal").filter(available_for_adoption=True).exclude(pk=animal.pk)[:3]
    return render(request, "public-temp/adopt-detail.html", {
        "animal": animal,
        "related_animals": related_animals,
    })


def adoption_form(request):
    return render(request, "public-temp/adoption-form.html")


def foster(request):
    foster_banner = Banner.objects.filter(page='foster', is_active=True).first()
    animal_detail = animal_details.objects.filter(status='Foster First')
    return render(request, "public-temp/foster.html", {"foster_banner": foster_banner, "animals": animal_detail})


def foster_form(request):
    return render(request, "public-temp/foster-form.html")


def report_animal(request):
    return render(request, "public-temp/report-animal.html")


def sponsor_animal(request):
    return render(request, "public-temp/sponsor-animal.html")


def work_animal_rescue(request):
    work_animal_rescue_banner = Banner.objects.filter(page='work_animal_rescue', is_active=True).first()
    return render(request, "public-temp/work-animal-rescue.html", {"work_animal_rescue_banner": work_animal_rescue_banner})


def work_disaster_relief(request):
    work_disaster_relief_banner = Banner.objects.filter(page='work_disaster_relief', is_active=True).first()
    return render(request, "public-temp/work-disaster-relief.html", {"work_disaster_relief_banner": work_disaster_relief_banner})


def work_environment(request):
    environment_banner = Banner.objects.filter(page='environment', is_active=True).first()
    return render(request, "public-temp/work-environment.html", {"environment_banner": environment_banner})


def work_sanitation(request):
    work_sanitation_banner = Banner.objects.filter(page='work_sanitation', is_active=True).first()
    return render(request, "public-temp/work-sanitation.html", {"work_sanitation_banner": work_sanitation_banner})


def dashboard_donor(request):
    return render(request, "public-temp/dashboard-donor.html")


def dashboard_rescue_status(request):
    return render(request, "public-temp/dashboard-rescue-status.html")


def dashboard_volunteer(request):
    return render(request, "public-temp/dashboard-volunteer.html")


def sitemap(request):
    sitemap_banner = Banner.objects.filter(page='sitemap', is_active=True).first()
    return render(request, "public-temp/sitemap.html", {"sitemap_banner": sitemap_banner})


def page_not_found(request):
    return render(request, "public-temp/404.html", status=404)
