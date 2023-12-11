# serializers.py
from django.db import transaction
from rest_framework import serializers
from .models import SplitMethod, SplitDetail, Expense


class SplitMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = SplitMethod
        fields = '__all__'

class SplitDetailSerializer(serializers.ModelSerializer):    
    class Meta:
        model = SplitDetail
        fields = '__all__'

class ExpenseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Expense
        fields = '__all__'

    def create(self, validated_data):
        with transaction.atomic():
            # Remove split detail from validated data.
            split_detail_data = self.initial_data.get('split_detail')

            # create expense object
            expense = Expense.objects.create(**validated_data)

            # Create split detail object
            for split_data in split_detail_data:
                split_data['expense'] = expense.id
                split_detail_serializer =  SplitDetailSerializer(data=split_data)
                if split_detail_serializer.is_valid():
                    split_detail_serializer.save()

            return expense
        
