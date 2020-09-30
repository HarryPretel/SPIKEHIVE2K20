from django.contrib import admin

# Register your models here.
from .models import Hive, User

admin.site.register(Hive)
admin.site.register(User)
