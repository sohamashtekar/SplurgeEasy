from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist

import uuid

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.username = email
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    REGISTRATION_STATUS_CHOICES = [
        ('C', 'Complete'),
        ('P', 'Pending'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30, blank=True, null=True)
    last_name = models.CharField(max_length=30, blank=True, null=True)
    phone_no = models.CharField(max_length=10, blank=True, null=True)
    phone_ext = models.CharField(max_length=3, blank=True, null=True)
    country_code = models.CharField(max_length=5, blank=True, null=True)
    registration_status = models.CharField(max_length=1, choices=REGISTRATION_STATUS_CHOICES)

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    

class ExpenseGroup(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    members = models.ManyToManyField('user.CustomUser', related_name='expense_group')
    created_by = models.ForeignKey('user.CustomUser', on_delete=models.PROTECT)
    created_on = models.DateTimeField(auto_now_add=True)

class Friend(models.Model):
    user1 = models.ForeignKey('user.CustomUser', related_name='user_1', on_delete=models.PROTECT)
    user2 = models.ForeignKey('user.CustomUser', related_name='user_2', on_delete=models.PROTECT)
    became_friends_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user1', 'user2']

    @classmethod
    def are_friends(cls, email1, email2):
        try:
            user1 = CustomUser.objects.get(email=email1)
            user2 = CustomUser.objects.get(email=email2)

            friends = cls.objects.filter(
                Q(user1=user1, user2=user2) | 
                Q(user1=user2, user2=user1)
            )

            return friends.exists()

        except ObjectDoesNotExist:
            return False
    
    @classmethod
    def get_friends(cls, user):
        # Get all Friend objects where the given user is either user1 or user2
        friends = cls.objects.filter(
            Q(user1=user) | 
            Q(user2=user)
        )

        # Get the friends of the user
        friend_users = []
        for friend in friends:
            if friend.user1 == user:
                friend_users.append(friend.user2)
            else:
                friend_users.append(friend.user1)

        return friend_users

class FriendRequest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('ACCEPTED', 'Accepted'),
        ('DECLINED', 'Declined'),
    ]

    from_user = models.ForeignKey('user.CustomUser', related_name='friend_req_created_by', on_delete=models.PROTECT)
    to_email = models.EmailField()
    status = models.CharField(max_length=8, choices=STATUS_CHOICES, default='PENDING')
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['from_user', 'to_email']
