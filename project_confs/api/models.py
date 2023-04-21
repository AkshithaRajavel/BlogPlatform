from django.db import models
from uuid import uuid4

# Create your models here.
class Users(models.Model):
    id = models.UUIDField(
        default=uuid4,
        null=False,
        unique=True,
        editable=False
    )
    email = models.EmailField(max_length = 254,primary_key=True)
    password = models.CharField(max_length=16)
class Posts(models.Model):
    id = models.UUIDField(
        default=uuid4,
        primary_key=True,
        editable=False
    )
    author = models.ForeignKey(Users,on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add= True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=100)
    markdown = models.CharField(max_length=5000)
class Subscribe(models.Model):
    user = models.ForeignKey(Users,on_delete=models.CASCADE,related_name='subscriber')
    subscribedTo = models.ForeignKey(Users,on_delete=models.CASCADE)
    class Meta:
        unique_together = (("user", "subscribedTo"),)
class NewFeed(models.Model):
    user = models.ForeignKey(Users,on_delete=models.CASCADE)
    postId = models.ForeignKey(Posts,on_delete=models.CASCADE)
# "SELECT name FROM sqlite_schema WHERE type ='table' AND name NOT LIKE 'sqlite_%'"