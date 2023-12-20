from django.contrib import admin

from .models import FriendRequest, ExpenseGroup, CustomUser

# Register your models here.

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ['from_user', 'to_email', 'status']

admin.site.register(FriendRequest, FriendRequestAdmin)

class UserGroupAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_by']

admin.site.register(ExpenseGroup, UserGroupAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'email', 'first_name', 'last_name']

admin.site.register(CustomUser, UserAdmin)