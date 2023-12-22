# urls.py

from django.urls import path
from .views import SaveExpenseView, ExpenseDetails

urlpatterns = [
    path('save-expense/', SaveExpenseView.as_view(), name='save_expense'),
    path('expense-details/', ExpenseDetails.as_view(), name='expense_details'),
]
