from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken
from rest_framework_simplejwt.exceptions import TokenError

from django.core.exceptions import ObjectDoesNotExist

from user.models import CustomUser
from .serializers import UserRegistrationSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        user = CustomUser.objects.get(username=request.data['email'])
        response.data['name'] = F'{user.first_name} {user.last_name}'
        response.data['email'] = F'{user.email}'
       
        # Customize the cookie settings for the access token
        response.set_cookie(
            key='refresh_token',
            value=response.data['refresh'],
            secure=True,
            httponly=True,
            samesite='None',
            max_age=86400,  # Set the desired max age (in seconds)
        )

        # Delete refresh token from response data as we are sending it as a cookie. 
        del response.data['refresh']

        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    def get(self, request, *args, **kwargs):
        # Retrieve the refresh token from the cookie
        refresh_token = request.COOKIES.get('refresh_token')

        if not refresh_token:
            return Response({'error': 'Refresh token not found in the cookie'}, status=400)

        # Perform the refresh token logic
        serializer = self.get_serializer(data={'refresh': refresh_token})

        try:
            if serializer.is_valid():
                token = RefreshToken(refresh_token)
                user = CustomUser.objects.get(id=token.payload['user_id'])
                access_token = serializer.validated_data.get('access')

                # Customize the response if needed
                response_data = {
                    'access': access_token,
                    'name': F'{user.first_name} {user.last_name}',
                    'email': F'{user.email}'
                }

                return Response(response_data)
        except TokenError:
            return Response(status=status.HTTP_403_FORBIDDEN)
        except ObjectDoesNotExist:
            return Response(status=status.HTTP_403_FORBIDDEN)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            if not refresh_token:
                return Response({'error': 'Refresh token not found in the cookie'}, status=400)

            token = RefreshToken(refresh_token)

            # Blacklist the refresh token
            token.blacklist()

            # Blacklist associated access tokens
            OutstandingToken.objects.filter(user=token.payload['user_id']).delete()

            # Clear cookie from the response
            res = Response(status=status.HTTP_200_OK)
            res.delete_cookie(key='refresh_token')
      
            return res
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Invalid token"})