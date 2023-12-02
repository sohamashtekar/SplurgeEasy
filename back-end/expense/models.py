import uuid
from django.db import models

# Create your models here.
class SplitMethod(models.Model):
    SPLIT_METHOD_CHOICES = [
        ('E', 'Equal'),
        ('P', 'Percentage'),
        ('U', 'Unqually'),
        ('S', 'Shares'),
        ('A', 'Adjustment')
    ]
    method = models.CharField(max_length=20, choices=SPLIT_METHOD_CHOICES)

class SplitDetail(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='user_split_detail')
    split_method = models.ForeignKey(SplitMethod, on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=8, decimal_places=2)
    calculated_amount = models.DecimalField(max_digits=8, decimal_places=2)
    is_settled = models.BooleanField(default=False)

class Expense(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.CharField(max_length=200)
    split_method = models.ForeignKey('expense.SplitMethod', on_delete=models.PROTECT)
    split_detail = models.ManyToManyField('expense.SplitDetail', related_name='split_detail') 
    note = models.CharField(max_length=200, blank=True, null=True)
    group = models.ForeignKey('user.ExpenseGroup', null=True, on_delete=models.PROTECT)
    created_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_created_by')
    paid_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_paid_by')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
