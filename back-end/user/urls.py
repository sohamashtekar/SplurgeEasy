from django.urls import path, include
from rest_framework import routers

from .views import FriendRequestView, UserDataView

router = routers.SimpleRouter()

urlpatterns = [
    path('friend-request/', FriendRequestView.as_view(), name='friend_request'),
    path('user-data/', UserDataView.as_view(), name='user_data'),
]