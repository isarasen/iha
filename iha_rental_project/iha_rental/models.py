# iha_rental/models.py

from django.db import models

class Rental(models.Model):
    model_name = models.CharField(max_length=100)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.model_name} ({self.brand})"
