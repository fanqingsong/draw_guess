
from django.db.models import fields
from rest_framework import serializers
from .models import Drawings

# class DrawingsSerializer(serializers.HyperlinkedModelSerializer):
class DrawingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawings
        fields = '__all__'



