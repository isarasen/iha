# iha_rental/views.py

from rest_framework import viewsets, filters
from .models import Rental
from .serializers import RentalSerializer
# iha_rental/views.py

from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

class RentalViewSet(viewsets.ModelViewSet):
    queryset = Rental.objects.all()
    serializer_class = RentalSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('model_name', 'category', 'brand')
    ordering_fields = ('model_name', 'category', 'brand')
