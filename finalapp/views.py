from django.shortcuts import render
from .models import Sejong

# Create your views here.

def index(request):
    return render(request, 'finalapp/index.html')

def show(request):
    sejong = Sejong.objects.all()
    return render(request, 'finalapp/show.html', {'sejong' : sejong})

def map(request):
    sejong = Sejong.objects.all().filter(type='병원')
    return render(request, 'finalapp/map.html', {'sejong' : sejong})

def test(request):
    sejong = Sejong.objects.all()
    return render(request, 'testapp/test.html', {'sejong': sejong})