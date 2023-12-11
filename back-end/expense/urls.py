# urls.py

from django.urls import path
from .views import SaveExpenseAPIView

urlpatterns = [
    path('save-expense/', SaveExpenseAPIView.as_view(), name='save_expense'),
]
