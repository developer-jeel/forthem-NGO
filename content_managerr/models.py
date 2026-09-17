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


class HomePageContent(models.Model):
    hero_heading = models.CharField(max_length=200, default='Every Life Deserves Care and Purpose.')
    hero_subheading = models.TextField(default='Unke Liye rescues, protects, and advocates for animals, communities, and the environment across India.')
    primary_cta_label = models.CharField(max_length=80, default='Donate Today')
    primary_cta_url = models.CharField(max_length=200, default='/donate')
    secondary_cta_label = models.CharField(max_length=80, default='Report an Animal')
    secondary_cta_url = models.CharField(max_length=200, default='/report-animal')
    stats_visible = models.BooleanField(default=True)
    stat1_number = models.CharField(max_length=40, default='4,200+')
    stat1_label = models.CharField(max_length=80, default='Animals Rescued')
    stat2_number = models.CharField(max_length=40, default='2.8Cr')
    stat2_label = models.CharField(max_length=80, default='Funds Raised')
    stat3_number = models.CharField(max_length=40, default='840+')
    stat3_label = models.CharField(max_length=80, default='Active Volunteers')
    stat4_number = models.CharField(max_length=40, default='24')
    stat4_label = models.CharField(max_length=80, default='Cities Covered')
    featured_campaigns_visible = models.BooleanField(default=True)
    featured_campaigns_heading = models.CharField(max_length=200, default='Campaigns Urgently Needing Support')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'Homepage content'

class numbers(models.Model):
    animals_rescued = models.CharField(max_length=40, default='4,200+')
    animals_treated = models.CharField(max_length=40, default='3,500+')
    trees_planted = models.CharField(max_length=40, default='1,200+')
    cleanups_conducted = models.CharField(max_length=40, default='150+')
    funds_raised = models.CharField(max_length=40, default='2.8Cr')
    active_volunteers = models.CharField(max_length=40, default='840+')
    cities_covered = models.CharField(max_length=40, default='24')
    people_supported = models.CharField(max_length=40, default='1,00,000+')

    def __str__(self):
            return 'Numbers that Unke Liye has achieved'

