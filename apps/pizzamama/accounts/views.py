from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model, login, logout, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


User = get_user_model()

def signup(request):
    if request.method == "POST":
        username = request.POST.get("username", "").strip()
        password = request.POST.get("password", "")
        telephone = request.POST.get("telephone", "").strip()[:11]
        email = request.POST.get("email", "").strip()
        nom = request.POST.get("nom", "").strip()[:30]

        # Contrôles côté serveur : le JavaScript du formulaire se contourne facilement.
        errors = []
        if not username or len(username) > 150:
            errors.append("Prénom invalide.")
        elif User.objects.filter(username=username).exists():
            errors.append("Ce prénom est déjà pris.")
        try:
            validate_email(email)
        except ValidationError:
            errors.append("Adresse e-mail invalide.")
        try:
            validate_password(password, User(username=username, email=email))
        except ValidationError as e:
            errors.extend(e.messages)

        if errors:
            return render(request, "accounts/signup.html", {"errors": errors})

        user = User.objects.create_user(username=username,password=password,
                                        telephone=telephone, nom=nom, email=email)
        login(request, user)
        return redirect('index')


    return render(request,"accounts/signup.html")


def login_user(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        user = authenticate(username=username,password=password)
        if user:
            login(request, user)
            return redirect('index')
        # Même message que l'identifiant ou le mot de passe soit faux.
        return render(request, 'accounts/login.html', {"errors": ["Identifiants incorrects."]})

    return render(request, 'accounts/login.html')



def logout_user(request):
    logout(request)
    return redirect('index')
