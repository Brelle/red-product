from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        User = get_user_model()
        email = os.environ.get("DJANGO_SUPERUSER_EMAIL")
        password = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

        self.stdout.write(f"=== DIAGNOSTIC ===")
        self.stdout.write(f"Email attendu: '{email}'")
        self.stdout.write(f"Password attendu (longueur): {len(password) if password else 0}")
        self.stdout.write(f"Nombre total d'utilisateurs: {User.objects.count()}")

        for u in User.objects.all():
            self.stdout.write(f"  -> username='{u.username}' email='{u.email}' is_active={u.is_active} is_superuser={u.is_superuser}")

        user = User.objects.filter(email=email).first()
        if user:
            self.stdout.write(f"Utilisateur trouvé avec cet email: username='{user.username}'")
            user.username = email
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.is_active = True
            user.save()
            check = user.check_password(password)
            self.stdout.write(self.style.SUCCESS(f"Corrigé. Vérification mot de passe après save: {check}"))
        else:
            User.objects.create_superuser(username=email, email=email, password=password)
            self.stdout.write(self.style.SUCCESS(f"Superuser {email} créé"))
        self.stdout.write(f"=== FIN DIAGNOSTIC ===")