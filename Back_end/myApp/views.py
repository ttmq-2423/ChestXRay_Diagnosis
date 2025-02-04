from django.shortcuts import render
from django.http import JsonResponse
import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image
from rest_framework.decorators import api_view
from .models import myApp
from .serializer import myAppSerializer
from io import BytesIO
import random 
import os
from collections import OrderedDict



def seed_everything(seed):
    random.seed(seed)
    os.environ['PYTHONHASHSEED'] = str(seed)
    torch.manual_seed(seed)

seed_everything(10)
device = torch.device('cpu')

# Danh sách tên các bệnh
class_names = ['Cardiomegaly', 'Edema', 'Consolidation', 'Atelectasis', 'Pleural Effusion']

# Load pre-trained DenseNet121 model và điều chỉnh lớp cuối cùng
def load_model():
    #model_instance = models.densenet121(pretrained=True)
    #model_instance = models.densenet121(weights=models.DenseNet121_Weights.IMAGENET1K_V1)

    model_instance = models.__dict__['densenet121'](num_classes=5) 
    #num_ftrs = model_instance.classifier.in_features
    #model_instance.classifier = nn.Linear(num_ftrs, 5)  # Điều chỉnh thanh 5 lớp

    # Load trọng số từ OrderedDict vào model
    checkpoint = torch.load('checkpoint-60.pth', map_location=torch.device('cpu'))  # Đường dẫn tới file chứa OrderedDict
    print('type checkpoint.pth',type(checkpoint))
    print(checkpoint.keys())
    if 'state_dict' in checkpoint.keys():
            checkpoint_model = checkpoint['state_dict']
    elif 'model' in checkpoint.keys():
            checkpoint_model = checkpoint['model']
    else:
        checkpoint_model = checkpoint

    
    model_instance.load_state_dict(checkpoint_model, strict=False)
    print(type(model_instance))
    # Chuyển model sang chế độ đánh giá (evaluation mode)
    model_instance.eval()
    model_instance.to(device)
    return model_instance

  

model = load_model()

@api_view(['POST'])
def upload_image(request):
    if request.method == 'POST':
        if 'imageFile' not in request.FILES:
            return JsonResponse({'error': 'No image file found.'}, status=400)

        image_file = request.FILES['imageFile']
        image = Image.open(image_file)
        result = process_image(image)
        
        return JsonResponse({'predicted_class_name': result}, status=200)
    else:
        return JsonResponse({'error': 'Invalid request method.'}, status=400)

def process_image(image):
    preprocess = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        #transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        transforms.Normalize([0.5056, 0.5056, 0.5056], [0.252, 0.252, 0.252])
   
       
    ])
    if image.mode != 'RGB':
        image = image.convert('RGB')

    input_tensor = preprocess(image)
    input_batch = input_tensor.unsqueeze(0)  

    #print(input_batch)
    with torch.no_grad():
        output = model(input_batch)

    probabilities = torch.sigmoid(output)
    print(probabilities)
    #threshold = 0.5
    #threshold = torch.tensor([0.5253, 0.4747, 0.5051, 0.3636, 0.7980])
    #threshold = torch.tensor([0.5084, 0.4585, 0.5846, 0.3260, 0.7489])
    threshold = torch.tensor([0.0978, 0.3113, 0.0557, 0.3112, 0.4780])

    predicted_classes = (probabilities > threshold).int().squeeze().tolist()
    
    #Chuyển chỉ số lớp thành tên bệnh
    predicted_class_names = [class_names[i] for i, val in enumerate(predicted_classes) if val == 1]
    
    # Nếu không có bệnh, trả về "No disease"
    if not predicted_class_names:
       predicted_class_names = ['No disease']
    print (predicted_class_names)
    return predicted_class_names
