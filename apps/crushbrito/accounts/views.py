from django.shortcuts import render, redirect,  get_object_or_404
from django.contrib.auth import login, logout, authenticate
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from django.contrib.auth.decorators import login_required
from .models import CustomUser
from django.contrib import messages



@login_required
def delete_account(request):
    if request.method == 'POST':
        # Supprimez le compte de l'utilisateur
        user = request.user
        user.delete()
        logout(request)  # Déconnectez l'utilisateur après la suppression
        messages.success(request, 'Votre compte a été supprimé avec succès.')
        return redirect('index')  # Redirigez l'utilisateur vers la page d'accueil ou une autre page de votre choix
    return render(request, 'accounts/delete_account.html')



def signup(request):
    if request.method == "POST":
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            username = form.cleaned_data['username']
            if CustomUser.objects.filter(username=username).exists():
                messages.error(request, "Ce prénom est déjà pris.")
            else:
                user = form.save()
                login(request, user)
                return redirect('all_users')
    else:
        form = CustomUserCreationForm()
    return render(request, 'accounts/signup.html', {'form': form})



def login_user(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('all_users')
            #return redirect('accueil', user_id=user.id)    # Rediriger vers le profil de l'utilisateur
    else:
        form = CustomAuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})


@login_required
def logout_user(request):
    logout(request)
    return redirect('index')






