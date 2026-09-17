from django.shortcuts import redirect, render
from content_managerr.models import Banner


def home(request):
    home_banner = Banner.objects.filter(page='home', is_active=True).first()
    return render(request, "public-temp/index.html", {"home_banner": home_banner})


def about(request):
    about_banner = Banner.objects.filter(page='about', is_active=True).first()
    return render(request, "public-temp/about.html", {"about_banner": about_banner})    


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
    return render(request, "public-temp/stories.html", {"stories_banner": stories_banner})


def story_detail(request, story_id):
    return render(request, "public-temp/story-detail.html")


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
    return render(request, "public-temp/adopt.html", {"adopt_banner": adopt_banner})    


def adopt_detail(request, animal_id):
    return render(request, "public-temp/adopt-detail.html")


def adoption_form(request):
    return render(request, "public-temp/adoption-form.html")


def foster(request):
    return render(request, "public-temp/foster.html")


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
