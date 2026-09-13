from django.shortcuts import render


def dashboard(request):
    return render(request, "campaign-manager/dashboard.html")


def campaigns(request):
    return render(request, "campaign-manager/campaigns.html")


def campaign_detail(request, campaign_id):
    return render(request, "campaign-manager/campaign-detail.html")


def campaign_new(request):
    return render(request, "campaign-manager/campaign-new.html")


def campaign_edit(request, campaign_id):
    return render(request, "campaign-manager/campaign-edit.html")


def budget(request):
    return render(request, "campaign-manager/budget.html")


def donors(request):
    return render(request, "campaign-manager/donors.html")


def fund_request_new(request):
    return render(request, "campaign-manager/fund-request-new.html")


def impact(request):
    return render(request, "campaign-manager/impact.html")


def reports(request):
    return render(request, "campaign-manager/reports.html")


def updates(request):
    return render(request, "campaign-manager/updates.html")


def index(request):
    return render(request, "campaign-manager/index.html")
