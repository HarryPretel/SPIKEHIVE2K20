from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username',)


class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')


#class UserSerializer(serializers.HyperlinkedModelSerializer):
#    class Meta:
#        model = User
#        fields = ('pk', 'first_name', 'last_name', 'email', 'password')


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
