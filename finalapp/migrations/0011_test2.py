# Generated by Django 3.1.3 on 2023-12-19 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('finalapp', '0010_test_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='Test2',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('big', models.TextField()),
                ('small', models.TextField()),
                ('count', models.IntegerField()),
            ],
        ),
    ]
