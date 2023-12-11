import uuid
from django.db import models

# Create your models here.
class SplitMethod(models.Model):
    SPLIT_METHOD_CHOICES = [
        ('E', 'Equal'),
        ('P', 'Percentage'),
        ('U', 'Unqually'),
        ('S', 'Shares'),
    ]
    id = models.CharField(primary_key=True, max_length=1, choices=SPLIT_METHOD_CHOICES, unique=True)

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

class Expense(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    total_amount = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.CharField(max_length=200)
    split_method = models.ForeignKey('expense.SplitMethod', on_delete=models.PROTECT)
    note = models.CharField(max_length=200, blank=True, null=True)
    group = models.ForeignKey('user.ExpenseGroup', null=True, on_delete=models.PROTECT)
    created_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_created_by')
    paid_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT, related_name='expense_paid_by')
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
