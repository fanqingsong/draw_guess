from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


# Create your models here.
class Drawings(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=131070)

    class Meta:
        managed = True


class Comments(models.Model):
    drawing = models.ForeignKey(Drawings, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=32767)

    class Meta:
        managed = True


