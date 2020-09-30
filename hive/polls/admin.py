from django.contrib import admin

# Register your models here.

from .models import User, Hive, Inspection, Equipment

admin.site.register(User)
