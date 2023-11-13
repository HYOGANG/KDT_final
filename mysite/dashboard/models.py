from django.db import models

class Pop(models.Model):
    type = models.CharField(max_length=10)
    m = models.IntegerField()
    f = models.IntegerField()

class Hospital(models.Model):
    type=models.TextField(max_length=255)
    hospital=models.IntegerField()
    doctor=models.IntegerField()

class Medicine(models.Model):
    age = models.TextField(max_length=10)
    m1 = models.IntegerField()
    m2 = models.IntegerField()
    m3 = models.IntegerField()
    m4 = models.IntegerField()
    m5 = models.IntegerField()
    m6 = models.IntegerField()
    m7 = models.IntegerField()
    m8 = models.IntegerField()

class Population(models.Model):
    age = models.TextField()
    total = models.IntegerField()
    m = models.IntegerField()
    f = models.IntegerField()

class Medicalinfo(models.Model):
    type = models.TextField()
    hospital = models.IntegerField()
    doctor = models.IntegerField()
    nurse = models.IntegerField()
    patient = models.IntegerField()

class Counts(models.Model):
    region=models.TextField()
    clinic=models.IntegerField()
    healthcenter=models.IntegerField()
    pharmacy = models.IntegerField()
    dentist = models.IntegerField()
    oriental = models.IntegerField()