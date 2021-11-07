from django.shortcuts import render
from rest_framework import viewsets
from .models import Drawings, Comments
from .serializer import DrawingsSerializer, CommentsSerializer

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
    

class CommentViewSet(viewsets.ModelViewSet):
    """
    """
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer