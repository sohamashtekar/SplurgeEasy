from rest_framework import serializers

from .models import CustomUser


class ExpenseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email']


class FriendSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'display_name']

    def get_display_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
    

class UserInfoSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'display_name', 'country_code']

    def get_display_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"
