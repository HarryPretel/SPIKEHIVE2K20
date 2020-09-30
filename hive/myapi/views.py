from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import HiveSerializer, UserSerializer
from .models import Hive, User


class HiveViewSet(viewsets.ModelViewSet):
    queryset = Hive.objects.all()
    serializer_class = HiveSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
