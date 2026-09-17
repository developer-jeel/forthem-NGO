from django.shortcuts import redirect, render
from content_managerr.models import Banner


def home(request):
    home_banner = Banner.objects.filter(page='home', is_active=True).first()
    return render(request, "public-temp/index.html", {"home_banner": home_banner})


def about(request):
    about_banner = Banner.objects.filter(page='about', is_active=True).first()
    return render(request, "public-temp/about.html", {"about_banner": about_banner})    


def campaigns(request):
    return render(request, "public-temp/campaigns.html")


def campaign_detail(request, campaign_id):
    return render(request, "public-temp/campaign-detail.html")


def campaign_donate(request):
    return render(request, "public-temp/campaign-donate.html")


def donate(request):
    return render(request, "public-temp/donate.html")


def donate_confirmation(request):
    return render(request, "public-temp/donate-confirmation.html")


def events(request):
    return render(request, "public-temp/events.html")


def event_detail(request, event_id):
    return render(request, "public-temp/event-detail.html")


def gallery(request):
    return render(request, "public-temp/gallery.html")


def impact(request):
    return render(request, "public-temp/impact.html")


def login(request):
    return redirect("login:login")

def news(request):
    return render(request, "public-temp/news.html")


def news_detail(request, news_id):
    return render(request, "public-temp/news-detail.html")


def stories(request):
    return render(request, "public-temp/stories.html")


def story_detail(request, story_id):
    return render(request, "public-temp/story-detail.html")


def volunteer(request):
    return render(request, "public-temp/volunteer.html")


def contact(request):
    return render(request, "public-temp/contact.html")


def faq(request):
    return render(request, "public-temp/faq.html")


def privacy_policy(request):
    return render(request, "public-temp/privacy-policy.html")


def terms(request):
    return render(request, "public-temp/terms.html")


def transparency(request):
    return render(request, "public-temp/transparency.html")


def adopt(request):
    return render(request, "public-temp/adopt.html")


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
    return render(request, "public-temp/work-animal-rescue.html")


def work_disaster_relief(request):
    return render(request, "public-temp/work-disaster-relief.html")


def work_environment(request):
    return render(request, "public-temp/work-environment.html")


def work_sanitation(request):
    return render(request, "public-temp/work-sanitation.html")


def dashboard_donor(request):
    return render(request, "public-temp/dashboard-donor.html")


def dashboard_rescue_status(request):
    return render(request, "public-temp/dashboard-rescue-status.html")


def dashboard_volunteer(request):
    return render(request, "public-temp/dashboard-volunteer.html")


def sitemap(request):
    return render(request, "public-temp/sitemap.html")


def page_not_found(request):
    return render(request, "public-temp/404.html", status=404)
