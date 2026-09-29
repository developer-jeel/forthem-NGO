from django.db import models
from django.utils import timezone
from dateutil.relativedelta import relativedelta

# Create your models here.
class animal(models.Model):    
    species_choices = (
        ('Dog', 'Dog'),
        ('Cat', 'Cat'),
        ('Bird', 'Bird'),
        ('Rabbit', 'Rabbit'),
        ('Guinea Pig', 'Guinea Pig'),
        ('Hamster', 'Hamster'),
        ('Fish', 'Fish'),
        ('Reptile', 'Reptile'),
        ('Amphibian', 'Amphibian'),
        ('Other', 'Other'),)
    
    gender_choices = (
        ('Male', 'Male'),
        ('Female', 'Female'),)
    
    size_choices = (
        ('Small', 'Small'),
        ('Medium', 'Medium'),
        ('Large', 'Large'),)

    name = models.CharField(max_length=200, default='Animal Name')
    image = models.ImageField(upload_to='adoption/animal/', blank=True, null=True)
    species = models.CharField(max_length=100, choices=species_choices, default='other')
    age = models.CharField(max_length=100, default='Age')
    breed = models.CharField(max_length=100, default='Breed')
    gender = models.CharField(max_length=10, choices=gender_choices, default='Male')
    medical_notes = models.TextField(default='Medical Notes')
    note = models.TextField(default='Note')
    description = models.TextField(default='Description')
    size = models.CharField(max_length=10, choices=size_choices, default='Small')
    weight = models.CharField(max_length=10, default='Weight')
    updated_at = models.DateTimeField(auto_now=True)
    is_adopted = models.BooleanField(default=False)
   
    def __str__(self):
        return f'Animal : {self.name} | {self.species} | {self.breed} | {self.age} | {self.gender}' 

class animal_details(models.Model):
    energy_level_choices = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),)

    grooming_needs_choices = (
        ('Low maintenance', 'Low maintenance'),
        ('Medium maintenance', 'Medium maintenance'),
        ('High maintenance', 'High maintenance'),)


    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    energy_level = models.CharField(max_length=20, choices=energy_level_choices, default='Medium')
    grooming_needs = models.CharField(max_length=20, choices=grooming_needs_choices, default='Medium maintenance')
    good_with_dogs = models.BooleanField(default=False)
    good_with_cats = models.BooleanField(default=False)
    good_with_kids = models.BooleanField(default=False)
    vaccinated = models.BooleanField(default=False)
    neutered = models.BooleanField(default=False)
    rescued_from = models.CharField(max_length=200, default='Rescued From')
    available_for_adoption = models.BooleanField(default=True)
    friendly = models.BooleanField(default=False)
    vaccination_date = models.DateTimeField(null=True, blank=True)
    neutering_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f'Animal Details: {self.animal.name} | {self.rescued_from} |' 



class adopted_animal(models.Model):
    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    adopter_name = models.CharField(max_length=200, default='Adopter Name')
    adopter_email = models.EmailField(max_length=200, default='Adopter Email')
    adopter_contact = models.CharField(max_length=10, default='Adopter Contact')
    adopter_city = models.CharField(max_length=100, default='Adopter City')
    adopter_state = models.CharField(max_length=100, default='Adopter State')
    adopter_zip_code = models.CharField(max_length=10, default='Adopter Zip Code')
    adopters_last_home_visit = models.DateTimeField(blank=True, null=True)
    adopter_address = models.TextField(default='Adopter Address')
    adoption_date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'Adopted Animal: {self.animal.name} by {self.adopter_name}'

class fostered_animal(models.Model):
    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    foster_name = models.CharField(max_length=200, default='Foster Name')
    foster_email = models.EmailField(max_length=200, default='Foster Email')
    foster_contact = models.CharField(max_length=10, default='Foster Contact')
    foster_city = models.CharField(max_length=100, default='Foster City')
    foster_state = models.CharField(max_length=100, default='Foster State')
    foster_zip_code = models.CharField(max_length=10, default='Foster Zip Code')
    foster_address = models.TextField(default='Foster Address')
    fostering_start_date = models.DateTimeField(auto_now_add=True)
    fostering_end_date = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f'Fostered Animal: {self.animal.name} by {self.foster_name}'

class adoption_request(models.Model):
    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    requester_name = models.CharField(max_length=200, default='Requester Name')
    requester_email = models.EmailField(max_length=200, default='Requester Email')
    requester_contact = models.CharField(max_length=10, default='Requester Contact')
    requester_city = models.CharField(max_length=100, default='Requester City')
    requester_state = models.CharField(max_length=100, default='Requester State')
    requester_zip_code = models.CharField(max_length=10, default='Requester Zip Code')
    requester_address = models.TextField(default='Requester Address')
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Adoption Request: {self.animal.name} by {self.requester_name}'

class foster_request(models.Model):
    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    requester_name = models.CharField(max_length=200, default='Requester Name')
    requester_email = models.EmailField(max_length=200, default='Requester Email')
    requester_contact = models.CharField(max_length=10, default='Requester Contact')
    requester_city = models.CharField(max_length=100, default='Requester City')
    requester_state = models.CharField(max_length=100, default='Requester State')
    requester_zip_code = models.CharField(max_length=10, default='Requester Zip Code')
    requester_address = models.TextField(default='Requester Address')
    start_date = models.DateTimeField(auto_now_add=True)
    end_date = models.DateTimeField(blank=True, null=True)
    request_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Adoption Request: {self.animal.name} by {self.requester_name}'

class sponsored_animal(models.Model):
    animal = models.ForeignKey(animal, on_delete=models.CASCADE)
    approx_expenses = models.IntegerField(default=1000)
    current_fund = models.IntegerField(default=0)

    def __str__(self):
        return f'Sponsored Animal: {self.animal.name}'
    
class sponser_donation(models.Model):
    donation_renewal_choice = (
        ('Monthly', 'Monthly'),
        ('Yearly', 'Yearly'),
        ('One-time', 'One-time'),)
    animal = models.ForeignKey(sponsored_animal, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, default='Sponser Name')
    email = models.EmailField(max_length=200, default='Sponser Email')
    contact = models.CharField(max_length=10, default='Sponser Contact')
    amount = models.IntegerField(default=0)
    donation_date = models.DateTimeField(auto_now_add=True)
    donation_renewal = models.CharField(max_length=20, choices=donation_renewal_choice, default='Monthly')
    donation_renewal_date = models.DateTimeField(null=True, blank=True)
    def save(self, *args, **kwargs):
        if not self.donation_renewal_date:

            if self.donation_renewal == 'Monthly':
                self.donation_renewal_date = timezone.now() + relativedelta(months=1)

            elif self.donation_renewal == 'Yearly':
                self.donation_renewal_date = timezone.now() + relativedelta(years=1)

            elif self.donation_renewal == 'One-time':
                self.donation_renewal_date = None

        super().save(*args, **kwargs)

    def __str__(self):
        return f'Sponser Donation: {self.animal.animal.name} by {self.name}'