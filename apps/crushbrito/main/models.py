from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from accounts.models import CustomUser


class Review(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    bio = models.TextField() 
    color = models.CharField(max_length=7)

    def __str__(self):
        return f"Review by {self.user}"
    

    
class Message(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    bio = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    
    def __str__(self):
        return f"Message by {self.user}"
 


class envoyer_message(models.Model):
    recipient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    lu = models.BooleanField(default=False)  # Nouveau champ pour suivre l'état de lecture

    def __str__(self):
        return f"Message from {self.sender} to {self.recipient}"


class BoiteDeReception(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    conversations = models.ManyToManyField(CustomUser, related_name='conversations')
    last_message_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Boîte de réception de {self.user}"
    
    
