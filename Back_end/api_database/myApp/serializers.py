from rest_framework import serializers 
from myApp.models import User 
from myApp.models import Image
 
 
class myAppSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('id',
                  'firstName',
                  'lastName',
                  'email',
                  'password',
                  'avatar',
                  'created_at')
        
class UploadedImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id',
                  'email', 
                  'image', 
                  'result',
                  'uploaded_at')