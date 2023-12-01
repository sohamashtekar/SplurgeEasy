from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken, OutstandingToken

from .serializers import UserRegistrationSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Customize the cookie settings for the access token
        response.set_cookie(
            key='refresh_token',
            value=response.data['refresh'],
            secure=False,   # Set to True in production
            httponly=True,
            max_age=3600,  # Set the desired max age (in seconds)
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

        if serializer.is_valid():
            refresh = serializer.validated_data
            access_token = serializer.validated_data.get('access')

            # Customize the response if needed
            response_data = {'access': access_token}

            return Response(response_data)

        return Response(serializer.errors, status=400)

class UserRegistrationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
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

            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"error": "Invalid token"})