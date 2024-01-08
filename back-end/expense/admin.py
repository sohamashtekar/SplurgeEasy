from django.contrib import admin
from .models import Expense, SplitDetail

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['id', 'description', 'paid_by', 'total_amount', 'created_on']

admin.site.register(Expense, ExpenseAdmin)

class SplitDetailAdmin(admin.ModelAdmin):
    list_display = ['expense', 'user', 'calculated_amount']

admin.site.register(SplitDetail, SplitDetailAdmin)