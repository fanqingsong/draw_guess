# backend/server/apps/accounts/urls.py file

from django.conf.urls import url, include
from .views import UserAPI

accounts_api_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
    url(r'^api/v1/users/medetail', UserAPI.as_view())
]
