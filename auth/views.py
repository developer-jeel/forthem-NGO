from django.shortcuts import render, redirect
import django.utils.timezone as timezone    
from admin.models import Manager
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import check_password, make_password
from django.contrib import messages
# Create your views here.
def login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')

        manager = Manager.objects.filter(email=email).first()
        print("================================>",manager)

        if manager.is_active:
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

            else:
                error_message = "Invalid email or password. Please try again."
                return render(request, "admin-temp/login.html", {"error_message": error_message})
        else:
            error_message = "Your account is not active. Please contact the administrator."
            return render(request, "admin-temp/login.html", {"error_message": error_message})       
    return render(request, "admin-temp/login.html")

def check_login(allowed_roles):
    def decorator(view_function):
        def wrapper(request, *args, **kwargs):
            if "contact" in request.session:
                try:
                    manager = Manager.objects.get(contact=request.session['contact'])
                    request.uid = manager
                    #  Role check
                    if manager.role not in allowed_roles:
                        messages.error(request, "Access Denied")
                        return redirect('login')

                    return view_function(request, *args, **kwargs)

                except Manager.DoesNotExist:
                    return redirect('login')

            return redirect('login')
        return wrapper
    return decorator