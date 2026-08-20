from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import send_mail
from django.conf import settings
from .models import Product
from .serializers import ProductSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer  


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_request(request):
    email = request.data.get('email')
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'detail': 'Si ce compte existe, un email a été envoyé.'})

    uid = urlsafe_base64_encode(force_bytes(user.pk))
    token = default_token_generator.make_token(user)
    reset_link = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"

    send_mail(
        subject='Réinitialisation de votre mot de passe - Red Product',
        message=f'Cliquez sur ce lien pour réinitialiser votre mot de passe : {reset_link}',
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[email],
    )
    return Response({'detail': 'Si ce compte existe, un email a été envoyé.'})


@api_view(['POST'])
@permission_classes([AllowAny])
def password_reset_confirm(request):
    uidb64 = request.data.get('uid')
    token = request.data.get('token')
    new_password = request.data.get('new_password')

    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, User.DoesNotExist):
        return Response({'detail': 'Lien invalide.'}, status=400)

    if not default_token_generator.check_token(user, token):
        return Response({'detail': 'Lien invalide ou expiré.'}, status=400)

    user.set_password(new_password)
    user.save()
    return Response({'detail': 'Mot de passe réinitialisé avec succès.'})