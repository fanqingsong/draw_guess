from django.shortcuts import render
from rest_framework import viewsets
from .models import Drawings
from .serializer import DrawingsSerializer

def index(request):
    return render(request, 'chat/index.html')

def room(request, room_name):
    return render(request, 'chat/room.html', {
        'room_name': room_name
    })


class DrawingViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Drawings.objects.all()
    serializer_class = DrawingsSerializer
    
