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
    animals_rescued = models.IntegerField(default=4200)
    animals_treated = models.IntegerField(default=3500)
    trees_planted = models.IntegerField(default=1000)
    cleanups_conducted = models.IntegerField(default=150)
    funds_raised = models.CharField(max_length=40, default='2.8Cr')
    active_volunteers = models.CharField(max_length=40, default='840+')
    cities_covered = models.CharField(max_length=40, default='24')
    people_supported = models.CharField(max_length=40, default='1000+')
    disaster_ops = models.IntegerField(default=47)

    def __str__(self):
            return 'Numbers that Unke Liye has achieved'

class story(models.Model):
    type_choices = (
        ('success', 'Success Story'),
        ('rescue', 'Rescue Story'),
        ('awareness', 'Awareness Story'),
        ('campaign', 'Campaign Story'),
        ('volunteer', 'Volunteer Story'),
        ('event', 'Event Story'),
        ('fundraising', 'Fundraising Story'),
        ('partnership', 'Partnership Story'),
        ('media', 'Media Story'),
        ('Disaster Relief', 'Disaster Relief Story'),
        ('Sanitation', 'Sanitation Story'),
        ('Environment', 'Environment Story'),
    )
    status_choices = (
            ('draft', 'Draft'),
            ('published', 'Published'),
            ('archived', 'Archived'),
        )
    type = models.CharField(max_length=20, choices=type_choices, default='success')
    status = models.CharField(max_length=20, choices=status_choices, default='draft')
    story_no = models.IntegerField(unique=True)
    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='content/stories/', blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    instagram_link = models.URLField(max_length=200, blank=True, null=True)
    youtube_link = models.URLField(max_length=200, blank=True, null=True)
    facebook_link = models.URLField(max_length=200, blank=True, null=True)
    author = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False)
    

    def __str__(self):
        return self.title

    @property
    def type_badge_class(self):
        mapping = {
            'rescue': 'badge-terracotta',
            'Environment': 'badge-leaf',
            'Disaster Relief': 'badge-red',
            'Sanitation': 'badge-info',
            'campaign': 'badge-warning',
            'fundraising': 'badge-warning',
            'success': 'badge-success',
            'volunteer': 'badge-leaf',
            'awareness': 'badge-info',
            'media': 'badge-info',
            'event': 'badge-slate',
            'partnership': 'badge-terracotta',
        }
        return mapping.get(self.type, 'badge-slate')


class About(models.Model):
    heading = models.CharField(max_length=200, default='About Unke Liye')
    content = models.TextField(default='Unke Liye is a non-profit organization dedicated to rescuing and protecting animals, advocating for communities, and promoting environmental sustainability across India. Our mission is to create a world where every life is valued and cared for.')
    vision_heading = models.CharField(max_length=200, default='Our Vision')
    vision_content = models.TextField(default='To create a compassionate society where animals, communities,and the environment are respected and nurtured.')
    mission_heading = models.CharField(max_length=200, default='Our Mission')
    mission_content = models.TextField(default='To rescue, protect, and advocate for animals, communities, and the environment through direct action, education, and collaboration.')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'About Unke Liye Content'

class about_story(models.Model):
    title = models.CharField(max_length=200, default='Our Story')
    content = models.TextField(default='Unke Liye was founded with the belief that every life deserves care and purpose. Over the years, we have grown into a dedicated team of volunteers and professionals committed to making a positive impact on the lives of animals, communities, and the environment across India.')
    image = models.ImageField(upload_to='content/about/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return 'About Story Content'

class about_journey(models.Model):
    year = models.IntegerField(default=2015)
    title = models.CharField(max_length=200, default='Our Journey')
    content = models.TextField(default='From our humble beginnings to our current initiatives, our journey has been one of compassion, dedication, and growth. We have faced challenges and celebrated successes, all while staying true to our mission of making a difference in the lives of those we serve.')
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'About Journey Content ({self.year})'

class about_team(models.Model):
    name = models.CharField(max_length=100, default='John Doe')
    role = models.CharField(max_length=100, default='Founder & CEO')
    bio = models.TextField(default='John Doe is the founder of Unke Liye, with a passion for animal welfare and community development. Under his leadership, the organization has grown to make a significant impact across India.')
    image = models.ImageField(upload_to='content/about/team/', blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'About Team Member: {self.name}'
