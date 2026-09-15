from django.db import models

# Create your models here.

class Banner(models.Model):
    PAGE_CHOICES = (
        ('home', 'Home'),
        ('about', 'About'),
        ('adopt', 'Adopt'),
        ('donate', 'Donate'),
        ('rescue', 'Animal Rescue'),
        ('environment', 'Environment'),
        ('contact', 'Contact'),
        ('faq', 'FAQ'),
    )

    page = models.CharField(max_length=20, choices=PAGE_CHOICES, default='home', unique=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='banners/')
    link = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title