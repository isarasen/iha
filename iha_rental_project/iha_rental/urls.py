# iha_rental/urls.pyfrom django.urls import include, path



from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RentalViewSet, index

router = DefaultRouter()
router.register(r'rentals', RentalViewSet)

from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('rentals.urls')), 
]
