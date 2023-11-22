from django.shortcuts import render
from .models import Hospital, Population, Medicalinfo, Counts, Sejong, NumTre, ToCost
from django.db.models import Sum

def dashboard_view(request):

    hospital_data = Hospital.objects.all().order_by('type')
    hospital_types = [data.type for data in hospital_data]
    hospital_hospitals = [data.hospital for data in hospital_data]
    hospital_doctors = [data.doctor for data in hospital_data]

    numtre_data = NumTre.objects.all().order_by('year')
    numtre_years = [data.year for data in numtre_data]
    numtre_numtres = [data.numtre for data in numtre_data]

    tocost_data = ToCost.objects.all().order_by('year')
    tocost_years = [data.year for data in tocost_data]
    tocost_tocosts = [data.tocost for data in tocost_data]

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
        'counts_regions':counts_regions,
        'counts_clinics':counts_clinics,
        'counts_healthcenters':counts_healthcenters,
        'counts_pharmacys': counts_pharmacys,
        'counts_dentists': counts_dentists,
        'counts_orientals': counts_orientals,
        'numtre_years': numtre_years,
        'numtre_numtres':numtre_numtres,
        'tocost_years':tocost_years,
        'tocost_tocosts':tocost_tocosts,
    }

    return render(request, 'finalapp/dashboard.html', context)

def map(request):
    sejong = Sejong.objects.all()
    return render(request, 'finalapp/map.html', {'sejong': sejong})
