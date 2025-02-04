from django.urls import path
from . import views 
 
urlpatterns = [ 
    path('api/user/register', views.register, name= 'register'),
    path('api/user/login', views.login, name='login'),
    path('api/user/user_infor', views.user_infor, name='user_infor'),


    path('api/user/update_avatar', views.update_avatar, name ='update_avatar'),

    path('api/image/upload_image', views.upload_image, name ='upload_image'),
    path('api/image/get_images', views.get_images, name ='get_images'),
    
    path('api/contact', views.contact, name='contact'),
    
]