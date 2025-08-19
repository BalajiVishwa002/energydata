from rest_framework import serializers
from .models import EnergeyData

class EnergyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = EnergeyData
        fields = "__all__"