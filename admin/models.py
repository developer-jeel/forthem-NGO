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
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    email = models.EmailField(unique=True,blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
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