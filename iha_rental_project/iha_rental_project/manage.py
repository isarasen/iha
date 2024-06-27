#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iha_rental_project.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

from django.db import models

class Rental(models.Model):
    model_name = models.CharField(max_length=100)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    category = models.CharField(max_length=100)
    brand = models.CharField(max_length=100)
    available = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.model_name} ({self.brand})"
