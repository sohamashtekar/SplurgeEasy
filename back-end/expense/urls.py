# urls.py

from django.urls import path
from .views import SaveExpenseView

urlpatterns = [
    path('save-expense/', SaveExpenseView.as_view(), name='save_expense'),
]
