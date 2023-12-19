# serializers.py
from django.db import transaction
from rest_framework import serializers

from expense.models import SplitMethod, SplitDetail, Expense

from user.models import ExpenseGroup
from user.serializers import UserInfoSerializer 


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
                if split_detail_serializer.is_valid(raise_exception=True):
                    split_detail_serializer.save()
                    

            return expense
        
class ExpenseDetailSerializer(serializers.ModelSerializer):
    created_by = UserInfoSerializer()
    paid_by = UserInfoSerializer()
    split_details = serializers.SerializerMethodField()
    
    class Meta:
        model = Expense
        fields = '__all__'
        
    def get_split_details(self, obj):
        remaining_balances_qs = obj.expense_details.filter(is_settled=False)
        remaining_balances_serializer = SplitDetailSerializer(remaining_balances_qs, many=True)
        remaining_balances_data = remaining_balances_serializer.data
        return remaining_balances_data
    
    
class GroupExpenseDetailsSerializer(serializers.ModelSerializer):
    created_by = UserInfoSerializer()
    members = UserInfoSerializer(many=True)
    balances = serializers.SerializerMethodField()
    
    class Meta:
        model = ExpenseGroup
        fields = '__all__'
        
    def get_balances(self, obj):
        group_expenses_qs = Expense.objects.filter(group=obj)
        group_expenses_serializer = ExpenseDetailSerializer(group_expenses_qs, many=True) 
        group_expense_details_data = group_expenses_serializer.data
        
        return group_expense_details_data