# Generated by Django 2.1.15 on 2021-03-13 01:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('community', '0003_answer_author'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='modify_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='question',
            name='modify_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
