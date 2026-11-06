import os
from django.contrib import admin
from django.urls import path
from resto .views import index, add_to_cart, cart, delete_cart, api_get_plats , alcool, cafe, charcuterie, d_sale, d_sucre, non_alcool, lasagne, pizza, pate, salade, sale, soda, sucre, the
from resto.views import  product_detail
from django.conf.urls.static import static
from accounts.views import signup, logout_user, login_user
from pizzeria import settings

urlpatterns = [
    path('', index ,name="index"),
    path('alcool/', alcool ,name="alcool"),
    path('cafe/', cafe ,name="cafe"),
    path('charcuterie/', charcuterie ,name="charcuterie"),
    path('d_sale/', d_sale ,name="d_sale"),
    path('d_sucre/', d_sucre ,name="d_sucre"),
    path('lasagne/', lasagne ,name="lasagne"),
    path('non_alcool/', non_alcool ,name="non_alcool"),
    path('pate/', pate ,name="pate"),
    path('pizza/', pizza ,name="pizza"),
    path('salade/', salade ,name="salade"),
    path('sale/', sale ,name="sale"),
    path('soda/', soda ,name="soda"),
    path('sucre/', sucre ,name="sucre"),
    path('the/', the ,name="the"),


    # Adresse de l'admin non devinable en production (variable DJANGO_ADMIN_PATH).
    path(os.environ.get("DJANGO_ADMIN_PATH") or "admin/", admin.site.urls),
    path('signup/', signup, name="signup"),
    path('logout/', logout_user, name="logout"),
    path('login/', login_user, name="login"),
    path('cart/', cart, name="cart"),
    path('cart/delete', delete_cart, name="delete-cart"),
    path('product/<str:slug>/', product_detail, name="product"),
    path('product/<str:slug>/add-to-cart/', add_to_cart, name="add-to-cart"),
    path('api/GetPlats', api_get_plats),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
