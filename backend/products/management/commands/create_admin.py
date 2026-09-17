from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User = get_user_model()
        user = User.objects.filter(username="Brelle").first()
        if user:
            user.username = "moueleyembi@gmail.com"
            user.save()
            self.stdout.write("Username mis à jour")