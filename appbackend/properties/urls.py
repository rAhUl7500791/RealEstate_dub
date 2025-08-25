from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet, PropertyImageViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename="properties")
router.register(r'property-images', PropertyImageViewSet, basename="property-images")

urlpatterns = [
    path('', include(router.urls)),
]
