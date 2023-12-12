import uuid

from django.db import models
from django.db.models import Sum, F, Q

# Create your models here.
class SplitMethod(models.Model):
    SPLIT_METHOD_CHOICES = [
        ('E', 'Equal'),
        ('P', 'Percentage'),
        ('U', 'Unqually'),
        ('S', 'Shares'),
    ]
    id = models.CharField(primary_key=True, max_length=1, choices=SPLIT_METHOD_CHOICES, unique=True)
    
    def __str__(self):
        return self.id

class SplitDetail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    expense = models.ForeignKey('expense.Expense', on_delete=models.PROTECT, related_name='expense_details')
    user = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='user_split_detail')
    split_method = models.ForeignKey(SplitMethod, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=8, decimal_places=2)
    calculated_amount = models.DecimalField(max_digits=8, decimal_places=2)
    is_settled = models.BooleanField(default=False)
    settled_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_settled_by', null=True)
    settled_on = models.DateTimeField(null=True, blank=True)

    @classmethod
    def get_users_balance_sheet(cls, user):
        # Calculate the amount that user's friends owe to the user
        owed_amount_qs = list(cls.objects.filter(expense__paid_by=user).exclude(Q(is_settled=True) | Q(user=user)).select_related('expense', 'user', 'split_method'))
        

        # Calculate the amount that user's owes to friends
        split_details_for_user = set(list(cls.objects.filter(user=user).exclude(Q(expense__paid_by=user) | Q(is_settled=True)).select_related('expense').values_list('expense', flat=True)))
        expenses_owed_by_user = Expense.objects.filter(id__in=split_details_for_user)
        split_details_for_amount_user_owes = cls.objects.filter(expense__in=expenses_owed_by_user, user=user).exclude(Q(is_settled=True)).select_related('expense')
        amount_owes = split_details_for_amount_user_owes.values('expense__paid_by__id','expense__id').annotate(total_owed=Sum(F('calculated_amount') * -1))
        
        return amount_owes 

class Expense(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.CharField(max_length=200)
    split_method = models.ForeignKey('expense.SplitMethod', on_delete=models.PROTECT)
    note = models.CharField(max_length=200, blank=True, null=True)
    group = models.ForeignKey('user.ExpenseGroup', null=True, blank=True, on_delete=models.PROTECT)
    created_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_created_by')
    paid_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_paid_by')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return F'{self.description} - {self.total_amount} - {self.paid_by.username}'
