from django.db import models
from django.contrib.auth.models import AbstractUser
import django.utils.timezone as timezone
from datetime import timedelta
# Create your models here.

class Manager(models.Model):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Content_Manager', 'Content_Manager'),
        ('Campaign_Manager', 'Campaign_Manager'),
        ('Rescue_Manager', 'Rescue_Manager'),
        ('Finance_Manager', 'Finance_Manager'),
        ('Volunteer_Manager', 'Volunteer_Manager')
    )
    
    name = models.CharField(max_length=255)
    profile_picture = models.ImageField(upload_to='managers/profile_pictures/', blank=True, null=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True,blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    contact = models.CharField(max_length=10, unique=True , blank=True, null=True)
    second_contact = models.CharField(max_length=10, unique=True , blank=True, null=True)
    password = models.CharField(max_length=128)
    is_active = models.BooleanField(default=False)
    last_login = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        if self.email:
            return f"{self.name}-{self.role}({self.email} )"
        elif self.contact:
            return f"{self.name}-{self.role}({self.contact} )"
        return "No Data"

class about_partners(models.Model):
    name = models.CharField(max_length=200, default='Partner Name')
    logo = models.ImageField(upload_to='content/about/partners/', blank=True, null=True)
    website = models.URLField(max_length=200, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'About Partner: {self.name}'
