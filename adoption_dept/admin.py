from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(animal)
class AnimalAdmin(admin.ModelAdmin):
    list_display = ('name', 'species', 'age', 'gender', 'updated_at')
    list_filter = ('updated_at',)
    search_fields = ('name', 'species', 'breed')
    ordering = ('-updated_at',)

@admin.register(animal_details)
class AnimalDetailsAdmin(admin.ModelAdmin):
    list_display = ('animal', 'rescued_from', 'energy_level', 'grooming_needs', 'good_with_dogs', 'good_with_cats', 'good_with_kids', 'friendly')
    list_filter = ('energy_level', 'grooming_needs', 'good_with_dogs', 'good_with_cats', 'good_with_kids', 'friendly')
    search_fields = ('animal__name',)
    ordering = ('-animal__updated_at',)

@admin.register(adopted_animal)
class AdoptedAnimalAdmin(admin.ModelAdmin):
    list_display = ('animal', 'adopter_name', 'adopter_email', 'adopter_contact', 'adopter_city', 'adopter_state', 'adopter_zip_code', 'adopters_last_home_visit', 'adopter_address', 'adoption_date')
    list_filter = ('adoption_date',)
    search_fields = ('adopter_name', 'adopter_email', 'animal__name')
    ordering = ('-adoption_date',)

@admin.register(fostered_animal)
class FosteredAnimalAdmin(admin.ModelAdmin):
    list_display = ('animal', 'foster_name', 'foster_email', 'foster_contact', 'foster_city', 'foster_state', 'foster_zip_code', 'foster_address', 'fostering_start_date', 'fostering_end_date')
    list_filter = ('fostering_start_date', 'fostering_end_date')
    search_fields = ('foster_name', 'foster_email', 'animal__name')
    ordering = ('-fostering_start_date',)

@admin.register(adoption_request)
class AdoptionRequestAdmin(admin.ModelAdmin):
    list_display = ('animal', 'requester_name', 'requester_email', 'requester_contact', 'requester_city', 'requester_state', 'requester_zip_code', 'requester_address', 'request_date')
    list_filter = ('request_date',)
    search_fields = ('requester_name', 'requester_email', 'animal__name')
    ordering = ('-request_date',)

@admin.register(foster_request)
class FosterRequestAdmin(admin.ModelAdmin):
    list_display = ('animal', 'requester_name', 'requester_email', 'requester_contact', 'requester_city', 'requester_state', 'requester_zip_code', 'requester_address', 'start_date', 'end_date', 'request_date')
    list_filter = ('request_date', 'start_date', 'end_date')
    search_fields = ('requester_name', 'requester_email', 'animal__name')
    ordering = ('-request_date',)

@admin.register(sponsored_animal)
class SponsoredAnimalAdmin(admin.ModelAdmin):
    list_display = ('animal',)
    search_fields = ('name',)

@admin.register(sponser_donation)
class SponserDonationAdmin(admin.ModelAdmin):
    list_display = ('animal', 'name', 'email', 'contact', 'amount', 'donation_date', 'donation_renewal', 'donation_renewal_date')
    list_filter = ('donation_date', 'donation_renewal')
    search_fields = ('name', 'email', 'contact')
    ordering = ('-donation_date',)