from django.shortcuts import render
from .models import Hospital, Population, Medicalinfo, Counts, Sejong, Doctor
from django.db.models import F,Sum
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

        'table': table,
        'total_pop': total_pop,
        'medical': medical,
        'doc_pop': doc_pop,
        'nur_pop': nur_pop,
        'pat_pop': pat_pop,
        'd': d,
        'c': c,
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
    cln = counts.aggregate(Sum('clinic'))
    h_c = counts.aggregate(Sum('healthcenter'))
    pha = counts.aggregate(Sum('pharmacy'))
    den = counts.aggregate(Sum('dentist'))
    ori = counts.aggregate(Sum('oriental'))

    hospital_data = Hospital.objects.all().order_by('type')
    hospital_types = [data.type for data in hospital_data]
    hospital_hospitals = [data.hospital for data in hospital_data]
    hospital_doctors = [data.doctor for data in hospital_data]

    try:
        df2 = pd.read_csv("C:\projects\KDT_final-main\static\csv\medicalinfo.csv")
        json_records = df2.reset_index().to_json(orient='records')
        h = json.loads(json_records)
    except Exception as e:
        h = None
        print(f"An error occurred: {e}")

    doctora = Doctor.objects.filter(id__in=[22, 1, 11, 2, 3, 20, 14])
    doctorb = Doctor.objects.filter(id__in=[15, 10, 8, 6, 7, 12, 4, 13, 5])
    doctorc = Doctor.objects.filter(id__in=[9, 17, 18, 16, 23, 24, 19, 21])

    doctor = Doctor.objects.all()

    try:
        df3 = pd.read_csv("C:\projects\KDT_final-main\static\csv\devices.csv")
        json_records = df3.reset_index().to_json(orient='records')
        v = json.loads(json_records)
    except Exception as e:
        v = None
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
        'counts': counts,
        'cln': cln,
        'h_c': h_c,
        'pha': pha,
        'den': den,
        'ori': ori,
        'h':h,
        'v':v,
        'doctor': doctor,
        'doctora': doctora,
        'doctorb': doctorb,
        'doctorc': doctorc,
    }
    return render(request, 'finalapp/second.html', context)


