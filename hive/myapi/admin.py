from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(User)
admin.site.register(Hive)
admin.site.register(Inspection)
admin.site.register(Equipment)
