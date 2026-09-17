from django.db import models

# Create your models here.

class Banner(models.Model):
    PAGE_CHOICES = (
        ('home', 'Home'),
        ('about', 'About'),
        ('campaigns', 'Campaigns'),
        ('stories', 'Stories'),
        ('volunteer', 'Volunteer'),
        ('impact', 'Impact'),
        ('transparency', 'Transparency'),
        ('privacy_policy', 'Privacy Policy'),
        ('terms', 'Terms & Conditions'),
        ('sitemap', 'Sitemap'),
        ('adopt', 'Adopt'),
        ('donate', 'Donate'),
        ('rescue', 'Animal Rescue'),
        ('work_animal_rescue', 'Animal Rescue & Healthcare'),
        ('work_disaster_relief', 'Disaster Relief'),
        ('work_sanitation', 'Sanitation & Cleanliness'),
        ('environment', 'Environment'),
        ('contact', 'Contact'),
        ('faq', 'FAQ'),
    )

    page = models.CharField(max_length=20, choices=PAGE_CHOICES, default='home', unique=True)
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='banners/')
    content = models.CharField(max_length=100,null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title