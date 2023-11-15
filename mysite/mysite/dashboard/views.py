from django.shortcuts import render
from .models import Hospital, Medicine, Population, Medicalinfo, Counts
from django.db.models import Sum

def dashboard_view(request):

    hospital_data = Hospital.objects.all().order_by('type')
    hospital_types = [data.type for data in hospital_data]
    hospital_hospitals = [data.hospital for data in hospital_data]
    hospital_doctors = [data.doctor for data in hospital_data]

    medicine_data = Medicine.objects.all().order_by('age')
    medicine_ages = [data.age for data in medicine_data]
    medicine_m1s = [data. m1 for data in medicine_data]
    medicine_m2s = [data. m2 for data in medicine_data]
    medicine_m3s = [data. m3 for data in medicine_data]
    medicine_m4s = [data. m4 for data in medicine_data]
    medicine_m5s = [data. m5 for data in medicine_data]
    medicine_m6s = [data. m6 for data in medicine_data]
    medicine_m7s = [data. m7 for data in medicine_data]
    medicine_m8s = [data. m8 for data in medicine_data]

    table = Population.objects.all().values()
    total_pop = table.aggregate(Sum('total'))

    medical = Medicalinfo.objects.all().values()
    doc_pop = medical.aggregate(Sum('doctor'))
    nur_pop = medical.aggregate(Sum('nurse'))
    pat_pop = medical.aggregate(Sum('patient'))

    counts=Counts.objects.all().order_by('region')
    counts_regions = [data.region for data in counts]
    counts_clinics = [data.clinic for data in counts]
    counts_healthcenters = [data.healthcenter for data in counts]
    counts_pharmacys = [data.pharmacy for data in counts]
    counts_dentists = [data.dentist for data in counts]
    counts_orientals = [data.oriental for data in counts]



    context = {
        'table': table,
        'total_pop': total_pop,
        'medical': medical,
        'doc_pop': doc_pop,
        'nur_pop': nur_pop,
        'pat_pop': pat_pop,
        'hospital_types': hospital_types,
        'hospital_hospitals': hospital_hospitals,
        'hospital_doctors': hospital_doctors,
        'medicine_ages':medicine_ages,
        'medicine_m1s':medicine_m1s,
        'medicine_m2s':medicine_m2s,
        'medicine_m3s':medicine_m3s,
        'medicine_m4s':medicine_m4s,
        'medicine_m5s':medicine_m5s,
        'medicine_m6s':medicine_m6s,
        'medicine_m7s':medicine_m7s,
        'medicine_m8s':medicine_m8s,
        'counts_regions':counts_regions,
        'counts_clinics':counts_clinics,
        'counts_healthcenters':counts_healthcenters,
        'counts_pharmacys': counts_pharmacys,
        'counts_dentists': counts_dentists,
        'counts_orientals': counts_orientals,
    }

    return render(request, 'dashboard.html', context)