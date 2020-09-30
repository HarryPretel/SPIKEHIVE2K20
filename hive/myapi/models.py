
# Create your models here.
from django.db import models


class User(models.Model):
    username = models.CharField(max_length=1000, default='bug_catcher_kimbal')
    password = models.CharField(max_length=1000)
    apiary_addr = models.CharField(max_length=1000)
    contact_info = models.CharField(max_length=1000)

    def __str__(self):
        return self.username

    #question_text = models.CharField(max_length=200)
    #pub_date = models.DateTimeField('date published')


class Hive(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
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
        return self.date


class Equipment(models.Model):
    inspection = models.ForeignKey(Inspection, on_delete=models.CASCADE)
    tool_name = models.CharField(max_length=100)
    amount_in_inventory = models.IntegerField(default=1)
    condition = models.CharField(max_length=1000)
