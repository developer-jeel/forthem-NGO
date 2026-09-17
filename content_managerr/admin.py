from django.contrib import admin

from .models import *


@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
	list_display = ('page', 'title', 'is_active', 'created_at', 'updated_at')
	list_filter = ('page', 'is_active')
	search_fields = ('title',)

@admin.register(HomePageContent)
class HomePageContentAdmin(admin.ModelAdmin):
	list_display = ('hero_heading', 'hero_subheading', 'primary_cta_label', 'secondary_cta_label', 'stat1_number', 'stat2_number', 'stat3_number', 'stat4_number', 'featured_campaigns_heading')
	search_fields = ('hero_heading', 'hero_subheading', 'primary_cta_label', 'secondary_cta_label', 'stat1_number', 'stat2_number', 'stat3_number', 'stat4_number', 'featured_campaigns_heading')

@admin.register(numbers)
class NumbersAdmin(admin.ModelAdmin):
	list_display = ('animals_rescued', 'animals_treated', 'trees_planted', 'cleanups_conducted', 'funds_raised', 'active_volunteers', 'cities_covered', 'people_supported')

@admin.register(story)
class StoryAdmin(admin.ModelAdmin):
	list_display = ('story_no', 'title','author', 'created_at', 'updated_at')
	search_fields = ('story_no', 'title','author', 'instagram_link', 'youtube_link', 'facebook_link')