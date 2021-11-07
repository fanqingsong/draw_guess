# chat/urls.py
from django.urls import path
from django.conf.urls import url
from django.urls.conf import include
from rest_framework.routers import DefaultRouter

from . import views


urlpatterns = [
    path('', views.index, name='index'),
    # path('<str:room_name>/', views.room, name='room'),
]

router = DefaultRouter()
router.register(r'drawings', views.DrawingViewSet)
router.register(r'comments', views.CommentViewSet)

chat_api_urlpatterns = [
    url(r'^api/v1/', include(router.urls)),
]
