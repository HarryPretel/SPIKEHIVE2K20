from django.urls import include, path
from rest_framework import routers
from . import views
from .views import current_user, UserList

router = routers.DefaultRouter()
#router.register(r'users', views.UserList)
router.register(r'userprofiles', views.UserProfileViewSet)
router.register(r'hives', views.HiveViewSet)
router.register(r'inspections', views.InspectionViewSet)
router.register(r'equipment', views.EquipmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
