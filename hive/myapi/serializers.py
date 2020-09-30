from rest_framework import serializers
from .models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('pk', 'username', 'password', 'apiary_addr', 'contact_info')


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
