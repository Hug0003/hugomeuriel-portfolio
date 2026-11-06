from django.db import models
from django.contrib.auth.models import AbstractUser
from django.urls import reverse


class CustomUser(AbstractUser, models.Model):
    classe = models.CharField(max_length=10, unique=False)
    age = models.CharField(max_length=3, unique=False)
    insta = models.CharField(max_length=100, unique=False)
    profil_images = models.ImageField(upload_to='profil_images/', unique=False)



    def __str__(self):
        return self.username
    
    def insta_url(self):
        if self.insta:
            return f'https://www.instagram.com/{self.insta}/'
        return None
    
    
    def get_absolute_url(self):
        return reverse('profile', args=[str(self.id)])


