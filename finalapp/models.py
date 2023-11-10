from django.db import models

# Create your models here.

class Sejong(models.Model):
    #no = models.IntegerField(blank=True, null=True)  # Field name made lowercase.
    name = models.TextField(max_length=100)  # Field renamed to remove unsuitable characters.
    type = models.TextField()  # Field renamed to remove unsuitable characters.
    phone = models.TextField()
    code = models.IntegerField()
    address = models.TextField()
    address1 = models.TextField()