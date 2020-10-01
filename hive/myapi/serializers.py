from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'first_name', 'last_name', 'email', 'password')


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('pk', 'apiary_addr', 'contact_info', 'picture', 'username')


class HiveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hive
        fields = ('pk', 'user', 'name', 'addr')


class InspectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inspection
        fields = ('pk', 'hive', 'date', 'health', 'honey',
                  'queen_production', 'weight', 'net_weight_change')


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Equipment
        fields = ('pk', 'inspection', 'tool_name',
                  'amount_in_inventory', 'condition')
