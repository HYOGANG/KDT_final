# Generated by Django 4.2.7 on 2023-11-27 05:26

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("finalapp", "0007_doctor"),
    ]

    operations = [
        migrations.CreateModel(
            name="Inpatrank",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("rank", models.TextField()),
                ("disease", models.TextField()),
                ("count", models.IntegerField()),
                ("percent", models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name="Outpatrank",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("rank", models.TextField()),
                ("disease", models.TextField()),
                ("count", models.IntegerField()),
                ("percent", models.IntegerField()),
            ],
        ),
    ]
