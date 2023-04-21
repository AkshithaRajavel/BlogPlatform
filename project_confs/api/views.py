# dont change order of imports 
from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.http import JsonResponse
from django.core.serializers import serialize
from django.utils import timezone
from django.urls import reverse
from django.contrib.syndication.views import Feed
from .models import Users,Posts,Subscribe,NewFeed
import json
from datetime import *
from django.utils import timezone
# Create your views here.
class rssfeed(Feed):
    title = "BlogWebsite"
    link = ""
    description = "RSS feed of BlogWebsite"
    def items(self):
        today_min = datetime.combine(timezone.now().date(), datetime.today().time().min)
        today_max = datetime.combine(timezone.now().date(), datetime.today().time().max)
        p = Posts.objects.filter(timestamp__range=(today_min, today_max))
        return p

    def item_title(self, item):
        return item.title

    def item_description(self, item):
        return item.description
    # item_link is only needed if NewsItem has no get_absolute_url method.
    def item_link(self, item):
        return f'/view/{item.pk}'

def getuser(request):
    try:
        u = Users.objects.get(id=request.COOKIES['uuid'])
        f = Subscribe.objects.filter(user=u)
        following=[]
        for i in f:
            following.append(i.subscribedTo.email)
        f = Subscribe.objects.filter(subscribedTo=u)
        response={'isLoggedIn':1,'email':u.email,'following':following,'followers_cnt':len(f)}
    except:
        response={'isLoggedIn':0}
    return HttpResponse(json.dumps(response), content_type="application/json")
def login(request):
    data= json.loads(request.body)
    email,password = data['email'],data['password']
    status,message=1,""
    try:
        if(Users.objects.get(email=email).password!=password):
            status=0
            message="Wrong Password"
    except:
        status=0
        message="Wrong Username"
    data = {'status':status,'message':message}
    response = HttpResponse(json.dumps(data),content_type="application/json")
    if status:
        response.set_cookie('uuid',Users.objects.get(email=email).id)
    return response
def signup(request):
    data= json.loads(request.body)
    email,password = data['email'],data['password']
    try:
        Users.objects.get(email=email)
        status,message=0,"Email already exists"
    except:
        status,message=1,""
    u=Users(email=email,password=password)
    u.save()
    data = {'status':status,'message':message}
    response = HttpResponse(json.dumps(data),content_type="application/json")
    if status:
        response.set_cookie('uuid',Users.objects.get(email=email).id)
    return response
def logout(request):
    response = redirect('/')
    response.delete_cookie('uuid')
    return response
def create(request):
    title  = request.POST['title']
    description = request.POST['description']
    markdown =request.POST['markdown']
    id = request.COOKIES['uuid']
    u = Users.objects.get(id=id)
    p = Posts(author=u,title=title,description=description,markdown=markdown)
    f = Subscribe.objects.filter(subscribedTo=u)
    p.save()
    for i in f:
        nf = NewFeed(user=i.user,postId=p)
        nf.save()
    response = redirect('/dashboard')
    return response
def homeFeed(request):
    try:
        u = Users.objects.get(id=request.COOKIES['uuid'])
        nF = NewFeed.objects.filter(user=u)
        a = Subscribe.objects.filter(user=u)
        newFeed = Posts.objects.filter(
            id__in=[i.postId.id for i in nF]
        ).order_by('timestamp')
        caughtUp = Posts.objects.filter(
            author__in=[i.subscribedTo for i in a]
            ).exclude(
            id__in=[i.postId.id for i in nF]
            ).order_by('timestamp')
        all = Posts.objects.exclude(
            author__in=[i.subscribedTo for i in a]
            ).order_by('timestamp')
        
        newFeed = serialize("json", newFeed)
        newFeed = json.loads(newFeed)
        caughtUp = serialize("json", caughtUp)
        caughtUp = json.loads(caughtUp)
        all = serialize("json", all)
        all = json.loads(all)
        for i in nF:
            i.delete()
        response = {'newFeed':newFeed,'caughtUp':caughtUp,'all':all}
    except:
        all = Posts.objects.all().order_by('timestamp')
        all = serialize("json", all)
        all = json.loads(all)
        response = {'all':all}
    return JsonResponse(response,safe=False,status=200)
def authorPosts(request,author):
    u = Users.objects.get(email=author)
    p = Posts.objects.filter(author=u).order_by('timestamp')
    serialized_data = serialize("json", p)
    serialized_data = json.loads(serialized_data)
    return JsonResponse(serialized_data,safe=False,status=200)
def posts(request):
    u = Users.objects.get(id=request.COOKIES['uuid'])
    p = Posts.objects.filter(author=u).order_by('timestamp')
    serialized_data = serialize("json", p)
    serialized_data = json.loads(serialized_data)
    return JsonResponse(serialized_data,safe=False,status=200)
def view(request,id):
    p = Posts.objects.filter(id=id)
    serialized_data = serialize("json", p)
    serialized_data = json.loads(serialized_data)
    return JsonResponse(serialized_data,safe=False,status=200)
def delete(request):
    p = Posts.objects.get(id=request.POST['id'])
    p.delete()
    response = redirect('/dashboard')
    return response
def subscribe(request,author):
    u = Users.objects.get(id=request.COOKIES['uuid'])
    a = Users.objects.get(email=author)
    s = Subscribe(user = u,subscribedTo=a)
    s.save()
    response=redirect("/")
    return response
def unsubscribe(request,author):
    u = Users.objects.get(id=request.COOKIES['uuid'])
    a = Users.objects.get(email=author)
    s = Subscribe.objects.get(user = u,subscribedTo=a)
    s.delete()
    response=redirect("/")
    return response
def getFollowers(request):
    u = Users.objects.get(id=request.COOKIES['uuid'])
    f = Subscribe.objects.filter(subscribedTo=u)
    response = {
        'count':len(f),
        'list':[i.user.email for i in f]
        }
    return JsonResponse(response,safe=False,status=200)
def getFollowing(request):
    u = Users.objects.get(id=request.COOKIES['uuid'])
    f = Subscribe.objects.filter(user=u)
    response = {
        'count':len(f),
        'list':[i.subscribedTo.email for i in f]
        }
    return JsonResponse(response,safe=False,status=200)
