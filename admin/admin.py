from django.contrib import admin
from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Manager)
class ManagerAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'email', 'city', 'contact', 'second_contact', 'is_active', 'last_login')
    list_filter = ('role', 'is_active')
    search_fields = ('name', 'email', 'contact', 'second_contact')
