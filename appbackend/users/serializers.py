from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = CustomUser
        fields = ('username','email','password','is_agent')
    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            is_agent=validated_data['is_agent']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user