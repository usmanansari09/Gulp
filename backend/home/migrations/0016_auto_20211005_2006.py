# Generated by Django 2.2.24 on 2021-10-05 17:06

from django.db import migrations, models
import django.db.models.deletion
import home.models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0015_auto_20210915_0014'),
    ]

    operations = [
        migrations.AddField(
            model_name='timeline',
            name='restaurant',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='home.Restaurant'),
        ),
        migrations.AlterField(
            model_name='category',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to=home.models.nameFile),
        ),
    ]
