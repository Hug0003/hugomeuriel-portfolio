from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser, models.Model):
    telephone = models.CharField(max_length=11)
    nom = models.CharField(max_length=30)