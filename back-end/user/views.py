from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import CustomUser, FriendRequest, Friend

from django.db.models import F
from django.core.exceptions import ObjectDoesNotExist


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
            print(e)
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
            