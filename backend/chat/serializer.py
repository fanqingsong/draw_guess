
from django.db.models import fields
from rest_framework import serializers
from .models import Drawings, Comments

# class DrawingsSerializer(serializers.HyperlinkedModelSerializer):
class DrawingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drawings
        fields = '__all__'


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'


