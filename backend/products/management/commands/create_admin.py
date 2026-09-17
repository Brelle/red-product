from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    help = "Crée un superuser automatiquement s'il n'existe pas déjà"

    def handle(self, *args, **kwargs):
        User = get_user_model()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        if not email or not password:
            self.stdout.write("Variables DJANGO_SUPERUSER_EMAIL/PASSWORD manquantes")
            return

        if not User.objects.filter(email=email).exists():
            User.objects.create_superuser(username=email, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"Superuser {email} créé"))
        else:
            self.stdout.write("Superuser déjà existant")