# backend/server/apps/accounts/urls.py file

from django.conf.urls import url, include

accounts_urlpatterns = [
    url(r'^api/v1/', include('djoser.urls')),
    url(r'^api/v1/', include('djoser.urls.authtoken')),
]
