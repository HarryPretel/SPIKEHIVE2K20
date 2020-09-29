
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
    health = models.IntegerField(default=100)
    honey = models.IntegerField(default=100)
    queen_production = models.IntegerField(default=100)

    def __str__(self):
        return self.date

    def is_healthy(self):
        return self.health > 75
