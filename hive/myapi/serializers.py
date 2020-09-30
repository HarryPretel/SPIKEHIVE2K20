from rest_framework import serializers
from .models import Hive, User


class HiveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hive
        fields = ('user', 'name', 'addr')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'apiary_addr', 'contact_info')
