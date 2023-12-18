from django.urls import path
from .views import CustomTokenObtainPairView, CustomTokenRefreshView, UserRegistrationView, LogoutView


urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', UserRegistrationView.as_view(), name='user_registration'),
    path('logout/', LogoutView.as_view(), name='user_logout')
]