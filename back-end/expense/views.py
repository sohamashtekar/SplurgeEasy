from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import ExpenseSerializer, CompleteExpenseDetailsSerializer
from .models import Expense
from django.shortcuts import get_object_or_404

class SaveExpenseView(APIView):
    def post(self, request, *args, **kwargs):
        req_data = request.data
        serializer = ExpenseSerializer(data=req_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class ExpenseDetails(APIView):
    def get(self, request):
        user = request.user
        expense_id = request.query_params.get('expense_id')
        
        expense_obj = get_object_or_404(Expense, id=expense_id, expense_details__user=user)
        expense_details_serializer = CompleteExpenseDetailsSerializer(expense_obj)
        expense_details_data = expense_details_serializer.data
        
        return Response(expense_details_data, status=status.HTTP_200_OK)
        
