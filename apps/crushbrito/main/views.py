from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse
from accounts.forms import CustomUserCreationForm

from accounts.models import CustomUser
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_POST
import random
from .models import Review, Message, BoiteDeReception,envoyer_message
from .forms import MessageForm
from django.db.models import Q
from django.db.models import Max
import re





def index(request):
    form = CustomUserCreationForm(request.POST, request.FILES)
    return render(request, 'main/index.html', context={"form":form})

@login_required
def all_users(request):
    if request.method == 'POST':
        recipient_id = request.POST.get('recipient_id', '')  # Récupérez l'ID du destinataire depuis le formulaire
        if not recipient_id.isdigit():
            return redirect('all_users')
        # Redirigez l'utilisateur vers la conversation avec le destinataire
        return redirect('conversation', recipient_id=int(recipient_id))
    else:
        users = list(CustomUser.objects.exclude(id=request.user.id))
        random.shuffle(users)  # Exclure l'utilisateur connecté
        return render(request, 'main/all_users.html', {'users': users})
    
def news(request):
    reviews = Review.objects.all().order_by("-created_at")  # Récupère tous les messages.
    return render(request, 'main/news.html', {"reviews": reviews})

# La vue pour ajouter un message (bio).
@login_required
def ajouter_news(request):
    if request.method == "POST":
        bio = request.POST.get('bio')
        color = request.POST.get("color", "")
        # La couleur est insérée dans un attribut HTML : seule une couleur #rrggbb est acceptée.
        if not re.fullmatch(r"#[0-9a-fA-F]{6}", color):
            color = "#000000"
        user = request.user
        Review.objects.create(user=user, bio=bio, color=color)
        return redirect('news')
    return render(request, "main/ajouter_news.html")

# La vue pour supprimer un message (bio).
# POST uniquement : un simple lien piégé (GET) ne peut pas déclencher de suppression.
@login_required
@require_POST
def delete_news(request, pk):
    review = get_object_or_404(Review, pk=pk)

    # Vérifie si l'utilisateur actuel est le propriétaire du message avant de supprimer.
    if review.user == request.user:
        review.bio = ""
        review.save()
    
    return redirect('news')



@login_required
@require_POST
def delete_message(request, pk):
    message = get_object_or_404(Message, pk=pk)
    
    # Vérifie si l'utilisateur actuel est le propriétaire du message avant de supprimer.
    if message.user == request.user:
        message.bio = ""
        message.save()
    
    return redirect('message')






@login_required
@require_POST
def delete_conversation(request, pk):
    # Récupérer le message à supprimer
    message = get_object_or_404(envoyer_message, pk=pk)

    # Vérifier si l'utilisateur actuel est le propriétaire du message avant de supprimer.
    if message.sender == request.user:
        # Effacer le contenu du message
        message.content = ""
        message.save()

    # Rediriger vers la conversation avec le destinataire du message
    return redirect('conversation', recipient_id=message.recipient.id)







@login_required
def profil(request, user_id):
    user = get_object_or_404(CustomUser, id=user_id)
    return render(request, 'main/profil.html', {'user': user})


@login_required
def message(request):
    if request.method == "POST":
        bio = request.POST.get('bio')
        user = request.user
        Message.objects.create(user=user, bio=bio)
        
    # Récupérez les messages existants après les avoir créés ou en dehors du bloc POST.
    messages = Message.objects.all().order_by("-created_at")
    
    return render(request, 'main/message.html', {"messages": messages})





# Dans votre vue boite_reception
@login_required
def conversation(request, recipient_id):
    recipient = get_object_or_404(CustomUser, id=recipient_id)
    
    if request.method == "POST":
        form = MessageForm(request.POST)
        if form.is_valid():
            content = form.cleaned_data['content']
            sender = request.user
            envoyer_message.objects.create(content=content, sender=sender, recipient=recipient)
            return redirect('conversation', recipient_id=recipient_id)
    else:
        form = MessageForm()

    messages = envoyer_message.objects.filter(sender=request.user, recipient=recipient).order_by("-created_at") | envoyer_message.objects.filter(sender=recipient, recipient=request.user).order_by("-created_at")
    
    return render(request, "main/conversation.html", {"recipient": recipient, "form": form, "messages": messages})



@login_required
def boite_reception(request):
    user = request.user

    # Récupérez tous les utilisateurs avec lesquels l'utilisateur a eu une conversation (envoyé ou reçu un message)
    users_with_messages = CustomUser.objects.filter(
        Q(sent_messages__recipient=user) | Q(received_messages__sender=user)
    ).distinct()

    # Mettez à jour la date du dernier message pour chaque utilisateur dans la boîte de réception
    for user_with_messages in users_with_messages:
        boite_de_reception, created = BoiteDeReception.objects.get_or_create(user=user_with_messages)
        last_message_date = envoyer_message.objects.filter(
            Q(sender=user, recipient=user_with_messages) | Q(sender=user_with_messages, recipient=user)
        ).aggregate(Max('created_at'))['created_at__max']
        user_with_messages.boitedereception.last_message_date = last_message_date
        user_with_messages.boitedereception.save()

    # Tri des utilisateurs en fonction de la date du dernier message
    users_with_messages = users_with_messages.order_by('-boitedereception__last_message_date')
    return render(request, 'main/boite_reception.html', {'users_with_messages': users_with_messages})


