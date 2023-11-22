from django.shortcuts import render
from .models import Hospital, Population, Medicalinfo, Counts, Sejong
from django.db.models import Sum
from django.http import HttpResponse
import pandas as pd
import json


def dashboard_view(request):

    hospital_data = Hospital.objects.all().order_by('type')
    hospital_types = [data.type for data in hospital_data]
    hospital_hospitals = [data.hospital for data in hospital_data]
    hospital_doctors = [data.doctor for data in hospital_data]

    table = Population.objects.all().values()
    total_pop = table.aggregate(Sum('total'))

    medical = Medicalinfo.objects.all().values()
    doc_pop = medical.aggregate(Sum('doctor'))
    nur_pop = medical.aggregate(Sum('nurse'))
    pat_pop = medical.aggregate(Sum('patient'))

    context = {

        'table': table,
        'total_pop': total_pop,
        'medical': medical,
        'doc_pop': doc_pop,
        'nur_pop': nur_pop,
        'pat_pop': pat_pop
    }

    return render(request, 'finalapp/dashboard.html', context)

def map(request):
    sejong = Sejong.objects.all()
    return render(request, 'finalapp/map.html', {'sejong' : sejong})

def second_view(request):

    counts = Counts.objects.all().order_by('region')
    counts_regions = [data.region for data in counts]
    counts_clinics = [data.clinic for data in counts]
    counts_healthcenters = [data.healthcenter for data in counts]
    counts_pharmacys = [data.pharmacy for data in counts]
    counts_dentists = [data.dentist for data in counts]
    counts_orientals = [data.oriental for data in counts]

    hospital_data = Hospital.objects.all().order_by('type')
    hospital_types = [data.type for data in hospital_data]
    hospital_hospitals = [data.hospital for data in hospital_data]
    hospital_doctors = [data.doctor for data in hospital_data]

    try:
        df = pd.read_csv("C:\projects\KDT_final-main\static\csv\outpatient_rank.csv")
        json_records = df.reset_index().to_json(orient='records')
        d = json.loads(json_records)
    except Exception as e:
        d = None
        print(f"An error occurred: {e}")

    try:
        df1 = pd.read_csv("C:\projects\KDT_final-main\static\csv\hospitalize_rank.csv")
        json_records = df1.reset_index().to_json(orient='records')
        c = json.loads(json_records)
    except Exception as e:
        c = None
        print(f"An error occurred: {e}")

    context = {

        'counts_regions': counts_regions,
        'counts_clinics': counts_clinics,
        'counts_healthcenters': counts_healthcenters,
        'counts_pharmacys': counts_pharmacys,
        'counts_dentists': counts_dentists,
        'counts_orientals': counts_orientals,
        'hospital_types': hospital_types,
        'hospital_hospitals': hospital_hospitals,
        'hospital_doctors': hospital_doctors,
        'd': d,
        'c': c,
    }
    return render(request, 'finalapp/second.html', context)



