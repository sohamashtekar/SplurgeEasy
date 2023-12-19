from expense.models import Expense, SplitDetail

def get_friend_balance_details(current_user_id, friend_id):
    expenses_paid_by_friend_qs = Expense.objects.filter(paid_by=friend_id, expense_details__user=current_user_id)
    expenses_paid_by_user_qs = Expense.objects.filter(paid_by=current_user_id, expense_details__user=friend_id)
    
    all_expense_details = expenses_paid_by_friend_qs | expenses_paid_by_user_qs
    return all_expense_details

def get_dashboard_summary(current_user_id):
  
    expenses_paid_by_friend_qs = SplitDetail.objects.filter(user=current_user_id, is_settled=False).exclude(expense__paid_by=current_user_id)
    expense_amounts_paid_by_friend = list(expenses_paid_by_friend_qs.values_list('calculated_amount', flat=True))
    
    expenses_paid_by_user_qs = SplitDetail.objects.filter(expense__paid_by=current_user_id, is_settled=False).exclude(user=current_user_id).values_list('calculated_amount', flat=True)
    expense_amounts_paid_by_user = [abs(number) for number in expenses_paid_by_user_qs]

    expenses_owe = sum(expense_amounts_paid_by_friend)
    expenses_owed = sum(expense_amounts_paid_by_user)
    
    all_expense_amounts = expense_amounts_paid_by_friend + expense_amounts_paid_by_user
    total_balance = sum(all_expense_amounts)
    
    
    return {'expenses_owe': expenses_owe, 'expenses_owed': expenses_owed, 'total_balance': total_balance}