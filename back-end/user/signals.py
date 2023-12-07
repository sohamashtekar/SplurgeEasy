from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import FriendRequest, Friend, CustomUser

@receiver(post_save, sender=FriendRequest)
def create_friend(sender, instance, created, **kwargs):
    if created:
        return
    if instance.status == 'ACCEPTED':
        user1 = instance.from_user
        user2 = CustomUser.objects.get(email=instance.to_email)
        Friend.objects.create(user1=user1, user2=user2)
