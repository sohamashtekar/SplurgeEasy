from rest_framework import serializers
from .models import CustomUser
from expense.models import Expense, SplitDetail


class ExpenseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email']


class FriendSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()
    balance = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'display_name', 'balance']
        
    def __init__(self, *args, request_user=None, **kwargs):
        # Access custom_value here and use it as needed
        self.request_user = request_user
        super().__init__(*args, **kwargs)

    def get_display_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
    
    def get_balance(self, obj):
        expenses_paid_by_friend_qs = SplitDetail.objects.filter(expense__paid_by=obj,  user__in=[self.request_user.id], is_settled=False)
        expense_amounts_paid_by_friend = list(expenses_paid_by_friend_qs.values_list('calculated_amount', flat=True))
        
        expenses_paid_by_user_qs = SplitDetail.objects.filter(expense__paid_by=self.request_user,  user__in=[obj], is_settled=False).values_list('calculated_amount', flat=True)
        expense_amounts_paid_by_user = [abs(number) for number in expenses_paid_by_user_qs]
        
        all_expense_amounts = expense_amounts_paid_by_friend + expense_amounts_paid_by_user
        total_balance = sum(all_expense_amounts)
        
        return total_balance
    
    def get_detailed_expenses(self, obj):
        expenses_paid_by_friend_qs = SplitDetail.objects.filter(expense__paid_by=obj,  user__in=[self.request_user.id], is_settled=False)
        expenses_paid_by_user_qs = SplitDetail.objects.filter(expense__paid_by=self.request_user,  user__in=[obj], is_settled=False)
        
        return []
        

class UserInfoSerializer(serializers.ModelSerializer):
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'display_name', 'country_code']

    def get_display_name(self, obj):
        return f'{obj.first_name} {obj.last_name}'
