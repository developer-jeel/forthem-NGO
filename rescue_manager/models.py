from django.db import models
# Create your models here.

class animal_adoption(models.Model):
    energy_level_choices = (
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),)

    grooming_needs_choices = (
        ('Low maintenance', 'Low maintenance'),
        ('Medium maintenance', 'Medium maintenance'),
        ('High maintenance', 'High maintenance'),)

    name = models.CharField(max_length=200, default='Animal Name')
    image = models.ImageField(upload_to='adoption/animal/', blank=True, null=True)
    species = models.CharField(max_length=100, default='Species')
    age = models.CharField(max_length=100, default='Age')
    breed = models.CharField(max_length=100, default='Breed')
    gender = models.CharField(max_length=10, default='Gender')
    medical_notes = models.TextField(default='Medical Notes')
    note = models.TextField(default='Note')
    description = models.TextField(default='Description')
    good_with_dogs = models.BooleanField(default=False)
    good_with_cats = models.BooleanField(default=False)
    good_with_kids = models.BooleanField(default=False)
    friendly = models.BooleanField(default=False)
    is_adopted = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    energy_level = models.CharField(max_length=20, choices=energy_level_choices, default='Medium')
    grooming_needs = models.CharField(max_length=20, choices=grooming_needs_choices, default='Medium maintenance')

    def __str__(self):
        return f'Animal Adoption: {self.name}'

class adopted_animal(models.Model):
    animal = models.ForeignKey(animal_adoption, on_delete=models.CASCADE)
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
    animal = models.ForeignKey(animal_adoption, on_delete=models.CASCADE)
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
    animal = models.ForeignKey(animal_adoption, on_delete=models.CASCADE)
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
    animal = models.ForeignKey(animal_adoption, on_delete=models.CASCADE)
    requester_name = models.CharField(max_length=200, default='Requester Name')
    requester_email = models.EmailField(max_length=200, default='Requester Email')
    requester_contact = models.CharField(max_length=10, default='Requester Contact')
    requester_city = models.CharField(max_length=100, default='Requester City')
    requester_state = models.CharField(max_length=100, default='Requester State')
    requester_zip_code = models.CharField(max_length=10, default='Requester Zip Code')
    requester_address = models.TextField(default='Requester Address')
    request_date = models.DateTimeField(auto_now_add=True)
