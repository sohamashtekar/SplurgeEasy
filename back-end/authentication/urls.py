from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, UserRegistrationAPIView


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserRegistrationAPIView.as_view(), name='user_registration'),
]