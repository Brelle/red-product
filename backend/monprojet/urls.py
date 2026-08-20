from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from products.views import ProductViewSet, password_reset_request, password_reset_confirm, EmailTokenObtainPairView

router = DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', EmailTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/password-reset/', password_reset_request, name='password_reset_request'),
    path('api/password-reset-confirm/', password_reset_confirm, name='password_reset_confirm'),
]