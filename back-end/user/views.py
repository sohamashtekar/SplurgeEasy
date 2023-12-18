import traceback

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from expense.serializers import GroupExpenseDetailsSerializer

from .models import CustomUser, FriendRequest, Friend, ExpenseGroup
from .serializers import FriendSerializer, UserInfoSerializer, UserGroupSerializer

from django.db.models import F
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404


class FriendRequestView(APIView):
    def get(self, request):
        try:
            user_email = request.user.email

            # Create friend request object , is_rejected=False
            friend_requests = FriendRequest.objects.filter(to_email=user_email, status='PENDING').values(
                requestID=F('id'),
                firstName=F('from_user__first_name'),
                lastName=F('from_user__last_name'),
                email=F('from_user__email')
            )

            resposne_data = {
                'friend_requests': friend_requests,
            }
            
            return Response(data=resposne_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, *args, **kwargs):
        try:
            to_email = request.data.get('to_email', None)
            from_email = request.user.email

            if not to_email:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            # Check if email is a splurge easy user
            to_user = CustomUser.objects.filter(email=to_email).first()

            # Create friend request object
            created = False
            is_request_pending_or_accepted = FriendRequest.objects.filter(from_user=request.user, to_email=to_email, status__in=['PENDING', 'ACCEPTED']).exists()
            friend_request_by_to_user = FriendRequest.objects.filter(from_user=to_user, to_email=from_email, status__in=['PENDING', 'ACCEPTED']).exists()

            # Check if both users are already friends
            are_friends = Friend.are_friends(to_email, from_email)

            if not is_request_pending_or_accepted and not friend_request_by_to_user:
                created = True
                friend_request = FriendRequest.objects.create(from_user=request.user, to_email=to_email)

            resposne_data = {
                'isSeUser': bool(to_user),
                'requestCreated': created,
                'isPreviousRequestPending': is_request_pending_or_accepted,
                'areUserFriends': are_friends
            }
            
            return Response(data=resposne_data, status=status.HTTP_201_CREATED)

        except Exception as e:
            traceback.print_exc()
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

    def patch(self, request):
        try:
            request_id = request.data.get('requestId', None)
            accepted = request.data.get('isAccepted', None)

            if accepted == None or request_id == None:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            
            updated_status = 'ACCEPTED' if accepted else 'DECLINED'

            # Create friend request object
            friend_request = FriendRequest.objects.get(id=request_id, to_email=request.user.email)
            friend_request.status = updated_status
            friend_request.save()
            
            return Response(status=status.HTTP_200_OK)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            

class UserDataView(APIView):
    def get(self, request):
        try:
            response_data = {}

            # Get user info
            user_info_serializer = UserInfoSerializer(request.user)
            user_info_data = user_info_serializer.data
            response_data['user_info'] = user_info_data

            # Get user's friend requests
            user_email = request.user.email
            friend_requests = FriendRequest.get_friend_requests(user_email)
            response_data['friend_requests'] = friend_requests

            # Get user's friends
            friends = Friend.get_friends(request.user)
            friends_serializer = FriendSerializer(friends, many=True, request_user=request.user)
            friends_data = friends_serializer.data
            response_data['friends'] = friends_data


            # Get user's groups
            groups = ExpenseGroup.get_groups(request.user)
            print(type(groups))
            groups_serializer = UserGroupSerializer(groups, many=True)
            groups_data = groups_serializer.data
            response_data['groups'] = groups_data
           
            # Get user's balance sheet
            # SplitDetail.get_users_balance_sheet(request.user)

            # amount_owes_serializer = TotalOwedSerializer(amount_owes, many=True)
            # amount_owes_data = amount_owes_serializer.data
            # response_data['amount_owes'] = amount_owes_data

            return Response(data=response_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            print(e)
            traceback.print_exc()
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserGroupView(APIView):

    def post(self, request, *args, **kwargs):
        serializer = UserGroupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        group_id = request.query_params.get('group_id')

        group_details = get_object_or_404(ExpenseGroup, id=group_id, members=request.user)        
        
        groups_serializer = GroupExpenseDetailsSerializer(group_details)
        group_details_data = groups_serializer.data
        
        return Response(group_details_data, status=status.HTTP_200_OK)
        