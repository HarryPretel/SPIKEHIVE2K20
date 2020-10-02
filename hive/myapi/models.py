from django.contrib.auth.models import User
from django.db import models
from PIL import Image as image


class UserProfile(models.Model):
    # This line is required. Links UserProfile to a User model instance.
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    picture = models.ImageField(
        upload_to='profile_images', blank=True, default='default.jpg')
    apiary_addr = models.CharField(max_length=1000)
    contact_info = models.CharField(max_length=1000)

    def __str__(self):
        return self.user.username


class Hive(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    name = models.CharField(max_length=1000)
    addr = models.CharField(max_length=1000)

    def __str__(self):
        return self.name

    #question = models.ForeignKey(Question, on_delete=models.CASCADE)
    #choice_text = models.CharField(max_length=200)
    #votes = models.IntegerField(default=0)


class Inspection(models.Model):
    hive = models.ForeignKey(Hive, on_delete=models.CASCADE)
    date = models.DateTimeField('time of inspection')
    health = models.IntegerField('out of 10', default=10)
    honey = models.IntegerField('scale from 1-10 (10 hi)', default=10)
    queen_production = models.IntegerField('bees per month', default=100)
    weight = models.FloatField('pounds', default=100)
    net_weight_change = models.FloatField(
        'change in weight (lbs)', default=0)

    def __str__(self):
        return str(self.date)


class Equipment(models.Model):
    inspection = models.ForeignKey(Inspection, on_delete=models.CASCADE)
    tool_name = models.CharField(max_length=100)
    amount_in_inventory = models.IntegerField(default=1)
    condition = models.CharField(max_length=1000)
