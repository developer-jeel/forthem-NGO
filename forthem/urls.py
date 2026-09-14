"""
URL configuration for forthem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('django-admin/', admin.site.urls),
    path('login/', include('login.urls')),
    path('', include('public.urls')),
    path('admin-panel/', include('admin.urls')),
    path('campaign-manager/', include('campaign_manager.urls')),
    path('content-manager/', include('content_managerr.urls')),
    path('finance-manager/', include('finance_manager.urls')),
    path('rescue-manager/', include('rescue_manager.urls')),
    path('volunteer-manager/', include('volunteer_manager.urls')),
]
