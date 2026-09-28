from django.db import models
# Create your models here.

class rescue_request(models.Model):
    urgency_level_choices = (
        ('Critical', 'Critical'),
        ('Urgent', 'Urgent'),
        ('Non-Urgent', 'Non-Urgent'),
    )

    animal_type = models.CharField(max_length=100, default='Animal Type')
    condition = models.CharField(max_length=100, default='Condition')
    additional_info = models.TextField(default='Additional Info')
    urgency_level = models.CharField(max_length=20, choices=urgency_level_choices, default='Medium')
    image = models.ImageField(upload_to='rescue_manager/rescue/', blank=True, null=True)
    name = models.CharField(max_length=100, default='Name')
    contact = models.CharField(max_length=10, default='Contact')
    city = models.CharField(max_length=100, default='City')
    zip_code = models.CharField(max_length=10, default='Zip Code')
    address = models.TextField(default='Address')
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Rescue Request: {self.name} | {self.animal_type} | {self.condition} | {self.urgency_level} | {self.request_date}'   