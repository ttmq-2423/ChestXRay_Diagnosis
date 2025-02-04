from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.parsers import JSONParser 
from rest_framework import status
from myApp.serializers import UploadedImageSerializer
from myApp.models import User, Image
from myApp.serializers import myAppSerializer
from rest_framework.decorators import api_view
from django.core.exceptions import ObjectDoesNotExist
from . import send_email

import base64


@api_view(['GET', 'POST', 'DELETE'])
def register(request):

    if request.method == 'POST':

        user_data =  request;
        user_email = user_data.POST.get('email')
        try: 
           User.objects.get(email=user_email)        
           return JsonResponse(
               {"errCode" : 1,
                "message" : "Email already exists",
                "User" : ''}, 
               status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            user_firstName = user_data.POST.get('firstName')
            user_lastName = user_data.POST.get('lastName')
            user_avatar = request.POST.get('avatar')
            user_password = user_data.POST.get('password')
            User.objects.create(email = user_email, firstName = user_firstName, lastName = user_lastName, avatar = user_avatar, password = user_password)

            return JsonResponse(
                    {"errCode" : 0,
                    "message" : "User has been successfully created"}, 
                
                    status=status.HTTP_201_CREATED) 
    
        

@api_view(['GET', 'POST', 'DELETE'])
def login(request):
    if request.method == 'POST':
 
        user_email = request.data.get('email')
        user_password = request.data.get('password')
        try:
            existing_user = User.objects.get(email=user_email)         
            password = existing_user.password;
            if password == user_password:
                return JsonResponse(
                    {"errCode" : 0,
                    "message" : "User exists"}, 
                    status=status.HTTP_200_OK)
            return JsonResponse(
                {   "errCode" : 1,
                    "message" : "Wrong password"}, 
                status = status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return JsonResponse(
                {   "errCode" : 2,
                    "message" : "User does not exist"}, 
                status=status.HTTP_200_OK)
        


@api_view(['POST'])
def user_infor(request):
    if request.method == 'POST':
        user_email = request.data.get('email')
        try: 
            existing_user = User.objects.get(email=user_email)

            # Assuming you want to return some user information
            user_data = {
                "firstName":(existing_user.firstName),
                "lastName": (existing_user.lastName),
                "email": existing_user.email,
                "avatar": existing_user.avatar,
                "password" : existing_user.password,
                "created_at" : existing_user.created_at
            }
            return JsonResponse(user_data, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse(
                {"error": "User with the provided email does not exist."},
                status=status.HTTP_404_NOT_FOUND
            )


@api_view(['POST']) 
def update_avatar(request):
    if request.method == 'POST':
        user_email = request.POST.get('email')
        user_avatar = request.POST.get('avatar') 
        try:
            existing_user = User.objects.get(email=user_email)
            existing_user.avatar = user_avatar
            existing_user.save()
            return JsonResponse({
                "errCode": 0,
                "message": 'Avatar updated successfully',
            }, status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return JsonResponse({
                "errCode": 1,
                "message": 'User not found'
            }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return JsonResponse({
                'errCode': 2,
                'message': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST' :
        
        email_data = request.POST.get('email')
        image_data = request.POST.get('image')
        result_data = request.POST.get('result')
        Image.objects.create(email = email_data, image = image_data, result = result_data)
    
        return JsonResponse(
        {   "errCode" : 0,
            "message" : "Stored image"}, 
            status = status.HTTP_200_OK)
                
       
    return JsonResponse(
        {
            "errCode" : 1,
            "message" : "Failed store image"
        },
        status = status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
def get_images(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        
        if not email:
            return Response(
                {
                    "errCode": 1,
                    "message": "Email parameter is missing"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        images = Image.objects.all()  # Lấy tất cả hình ảnh từ cơ sở dữ liệu
        serialized_images = []
        
        #images= Image.objects.filter(email=email)
        #serialized_images = []        
        for image in images:
            if (image.email == email):
                serialized_images.append({
                    'image': image.image,
                    'result': image.result,
                    'uploaded_at' : image.uploaded_at
                })
        return Response (serialized_images, status=status.HTTP_200_OK)
    return Response(
        {
            "errCode": 1,
            "message": "Failed to retrieve images"
        },
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['POST'])
def contact(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        body = request.POST.get('body')
        body = "[From user " + email + ']\n' + body;
        check = send_email.send_email(subject,body)
        if not email:
            return Response(
                {
                    "errCode": 1,
                    "message": "Email parameter is missing"
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        if check == 1:
            return Response ({"errCode": 0,
                          "message": "Sent successfully"}, 
                          status=status.HTTP_200_OK)
    return Response(
        {
            "errCode": 1,
            "message": "Failed to send email"
        },
        status=status.HTTP_400_BAD_REQUEST
    )


        
        
    


