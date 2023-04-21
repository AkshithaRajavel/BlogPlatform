from django.urls import path
from .views import *
urlpatterns = [
    path("rssfeed",rssfeed()),
    path("userDetails",getuser),
    path('login',login),
    path('signup',signup),
    path('logout',logout),
    path('create',create),
    path('homeFeed',homeFeed),
    path('posts',posts),
    path('delete',delete),
    path('view/<str:id>',view),
    path('subscribe/<str:author>',subscribe),
    path('unsubscribe/<str:author>',unsubscribe),
    path('authorposts/<str:author>',authorPosts),
    path('followers',getFollowers),
    path('following',getFollowing)
]
