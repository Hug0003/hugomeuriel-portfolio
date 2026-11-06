"""
URL configuration for osculte project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
import os
from django.contrib import admin
from django.urls import path
from accounts.views import signup, logout_user, login_user, delete_account
from osculte import settings
from django.conf.urls.static import static
from main.views import index, all_users, news, ajouter_news, delete_news, message, delete_message, profil, conversation, boite_reception, delete_conversation
from django.conf.urls.static import static

urlpatterns = [
    # Adresse de l'admin non devinable en production (variable DJANGO_ADMIN_PATH).
    path(os.environ.get("DJANGO_ADMIN_PATH") or "admin/", admin.site.urls),
    path('', index, name="index"),

    path('news/', news, name='news'),
    path('delete_news/<int:pk>/', delete_news, name='delete_news'),
    path('delete_message/<int:pk>/', delete_message, name='delete_message'),
    path('delete_conversation/<int:pk>/', delete_conversation, name='delete_conversation'),

    path('ajouter_news/', ajouter_news, name='ajouter_news'),
    path('message/', message, name='message'),
    path('conversation/<int:recipient_id>/', conversation, name='conversation'),
    path('boite_reception/', boite_reception, name='boite_reception'),



    path('signup/', signup, name="signup"),
    path('logout/', logout_user, name="logout"),
    path('login/', login_user, name="login"),
    path('delete_account/', delete_account, name='delete_account'),

    path('all_users/', all_users, name='all_users'),
    path('profil/<int:user_id>/', profil, name="profil"),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

