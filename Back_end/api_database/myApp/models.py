from django.db import models


class User(models.Model):
    firstName = models.CharField(max_length=70, blank=False, default='')
    lastName = models.CharField(max_length=200,blank=False, default='')
    email = models.CharField(max_length=200,blank=False, default='')
    password = models.CharField(max_length=200,blank=False, default='')
    avatar = models.BinaryField()
    created_at = models.DateTimeField(auto_now_add=True)

class Image(models.Model):
  
    email = models.CharField(max_length=200,blank=False, default='')
    image = models.BinaryField()
    result = models.CharField(max_length=200,blank=False,default='')
    uploaded_at = models.DateTimeField(auto_now_add=True)

