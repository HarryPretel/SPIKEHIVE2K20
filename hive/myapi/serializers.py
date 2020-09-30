from rest_framework import serializers
from .models import *


class HiveSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hive
        fields = ('user', 'name', 'addr')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'apiary_addr', 'contact_info')


class EquipmentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Equipment
        fields = ('inspection', 'tool_name',
                  'amount_in_inventory', 'condition')


class InspectionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Inspection
        fields = ('hive', 'date', 'health', 'honey',
                  'queen_production', 'weight', 'net_weight_change')
