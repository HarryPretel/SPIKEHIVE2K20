from django.contrib import admin

# Register your models here.

from .models import User, Hive, Inspection, Equipment

admin.site.register(User)
admin.site.register(Hive)
admin.site.register(Inspection)
admin.site.register(Equipment)