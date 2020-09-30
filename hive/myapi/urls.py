from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'hives', views.HiveViewSet)
router.register(r'users', views.UserViewSet)
router.register(r'equipment', views.EquipmentViewSet)
router.register(r'inspections', views.InspectionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
