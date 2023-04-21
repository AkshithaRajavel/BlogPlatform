from django.urls import path
from .views import index
urlpatterns = [
    path('',index),
    path('login',index),
    path('signup',index),
    path('dashboard',index),
    path('editor',index),
    path('view/<str:id>',index),
    path('authorposts/<str:author>',index),
    path('followers',index),
    path('following',index)
]