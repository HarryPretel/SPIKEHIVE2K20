# Generated by Django 3.1.1 on 2020-09-30 20:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0004_auto_20200930_1832'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_pic',
            field=models.ImageField(default='default.jpg', upload_to=None),
        ),
    ]
