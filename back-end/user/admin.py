from django.contrib import admin

from .models import FriendRequest

# Register your models here.

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_email', 'status']

admin.site.register(FriendRequest, FriendRequestAdmin)