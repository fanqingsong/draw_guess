from django.shortcuts import render
from rest_framework import viewsets
from .models import Drawings, Comments
from .serializer import DrawingsSerializer, CommentsSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_list_or_404

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

    @action(methods=['get'], detail=False)
    def query(self, request):
        print("-------------------")
        print(request.query_params)

        drawing = request.query_params["drawing"]
        print("=====")
        print(drawing)

        queryset = Comments.objects.filter(drawing=drawing).order_by('id')
        
        # target = get_list_or_404(queryset)
        serializer = CommentsSerializer(queryset, many=True)
        return Response(serializer.data)



