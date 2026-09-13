from django.shortcuts import render
import django.utils.timezone as timezone
from models import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password, make_password

def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        manager = Manager.objects.filter(email=email).first()

        if manager.is_active :
            if manager is not None and check_password(password, manager.password):
                request.session['email'] = manager.email
                manager.last_login = timezone.now()
                manager.save()

                if manager.role == 'Admin':
                    return render(request, "admin-temp/dashboard.html")
                elif manager.role == 'Content_Manager':
                    return render(request, "content-manager/dashboard.html")
                elif manager.role == 'Campaign_Manager':
                    return render(request, "campaign-manager/dashboard.html")
                elif manager.role == 'Rescue_Manager':
                    return render(request, "rescue-manager/dashboard.html")
                elif manager.role == 'Finance_Manager':
                    return render(request, "finance-manager/dashboard.html")
                elif manager.role == 'Volunteer_Manager':
                    return render(request, "volunteer-manager/dashboard.html")
                
        # Perform authentication logic here (e.g., check against the database)
    return render(request, "admin-temp/login.html")

def dashboard(request):
    return render(request, "admin-temp/dashboard.html")


def activity(request):
    return render(request, "admin-temp/activity.html")


def admin_users(request):
    return render(request, "admin-temp/admin-users.html")


def animals(request):
    return render(request, "admin-temp/animals.html")


def animal_profile(request):
    return render(request, "admin-temp/animal-profile.html")


def banners(request):
    return render(request, "admin-temp/banners.html")


def campaigns(request):
    return render(request, "admin-temp/campaigns.html")


def campaign_detail(request, campaign_id):
    return render(request, "admin-temp/campaign-detail.html")


def content(request):
    return render(request, "admin-temp/content.html")


def donations(request):
    return render(request, "admin-temp/donations.html")


def donation_detail(request, donation_id):
    return render(request, "admin-temp/donation-detail.html")


def donors(request):
    return render(request, "admin-temp/donors.html")


def donor_profile(request, donor_id):
    return render(request, "admin-temp/donor-profile.html")


def events(request):
    return render(request, "admin-temp/events.html")


def event_detail(request, event_id):
    return render(request, "admin-temp/event-detail.html")


def gallery(request):
    return render(request, "admin-temp/gallery.html")


def index(request):
    return render(request, "admin-temp/index.html")


def login(request):
    return render(request, "admin-temp/login.html")


def messages(request):
    return render(request, "admin-temp/messages.html")


def notifications(request):
    return render(request, "admin-temp/notifications.html")


def operations(request):
    return render(request, "admin-temp/operations.html")


def reports(request):
    return render(request, "admin-temp/reports.html")


def roles(request):
    return render(request, "admin-temp/roles.html")


def settings(request):
    return render(request, "admin-temp/settings.html")


def stories(request):
    return render(request, "admin-temp/stories.html")


def tasks(request):
    return render(request, "admin-temp/tasks.html")


def volunteers(request):
    return render(request, "admin-temp/volunteers.html")


def volunteer_profile(request, volunteer_id):
    return render(request, "admin-temp/volunteer-profile.html")
