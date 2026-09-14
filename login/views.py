from functools import wraps

from django.shortcuts import render, redirect
import django.utils.timezone as timezone
from admin.models import Manager
from django.contrib.auth.hashers import check_password
from django.contrib import messages


def login(request):
    if request.method == 'POST':
        email = request.POST.get('email', '').strip()
        password = request.POST.get('password')

        manager = Manager.objects.filter(email=email).first()

        if manager is None or not check_password(password or '', manager.password):
            error_message = "Invalid email or password. Please try again."
            return render(request, "admin-temp/login.html", {"error_message": error_message})       

        if not manager.is_active:
            error_message = "Your account is not active. Please contact the administrator."
            return render(request, "admin-temp/login.html", {"error_message": error_message})

        request.session['manager_id'] = manager.pk
        manager.last_login = timezone.now()
        manager.save(update_fields=['last_login'])

        dashboard_templates = {
            'Admin': "admin-temp/dashboard.html",
            'Content_Manager': "content-manager/dashboard.html",
            'Campaign_Manager': "campaign-manager/dashboard.html",
            'Rescue_Manager': "rescue-manager/dashboard.html",
            'Finance_Manager': "finance-manager/dashboard.html",
            'Volunteer_Manager': "volunteer-manager/dashboard.html",
        }
        dashboard = dashboard_templates.get(manager.role)
        if dashboard:
            return render(request, dashboard)

    return render(request, "admin-temp/login.html")

def check_login(allowed_roles):
    def decorator(view_function):
        @wraps(view_function)
        def wrapper(request, *args, **kwargs):
            if "manager_id" in request.session:
                try:
                    manager = Manager.objects.get(pk=request.session['manager_id'])
                    request.uid = manager
                    if not manager.is_active or manager.role not in allowed_roles:
                        messages.error(request, "Access Denied")
                        return redirect('login:login')

                    return view_function(request, *args, **kwargs)

                except Manager.DoesNotExist:
                    request.session.pop('manager_id', None)
                    return redirect('login:login')

            return redirect('login:login')
        return wrapper
    return decorator