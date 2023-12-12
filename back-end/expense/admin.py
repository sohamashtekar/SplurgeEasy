from django.contrib import admin
from .models import Expense, SplitDetail

class ExpenseAdmin(admin.ModelAdmin):
    list_display = ['description', 'paid_by', 'total_amount']

admin.site.register(Expense, ExpenseAdmin)

class SplitDetailAdmin(admin.ModelAdmin):
    list_display = ['user', 'calculated_amount', 'expense']

admin.site.register(SplitDetail, SplitDetailAdmin)