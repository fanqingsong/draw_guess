"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from django.views.generic.base import TemplateView

from accounts.urls import accounts_api_urlpatterns
from chat.urls import chat_api_urlpatterns

urlpatterns = [
    # SPA entry page 
    path('',TemplateView.as_view(template_name="index.html")),

    path('chat/', include('chat.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns += accounts_api_urlpatterns #
urlpatterns += chat_api_urlpatterns


