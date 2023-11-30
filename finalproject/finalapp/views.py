from django.shortcuts import render
from .models import Hospital, Medicine, Population, Medicalinfo, Counts, Sejong, NumTre,ToCost, Regionpop, Doctor,  Inpatrank, Outpatrank
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

    inrank = Inpatrank.objects.all().values()
    outrank = Outpatrank.objects.all().values()


    numtre_data = NumTre.objects.all().order_by('year')
    numtre_years = [data.year for data in numtre_data]
    numtre_numtres = [data.numtre for data in numtre_data]

    tocost_data = ToCost.objects.all().order_by('year')
    tocost_years = [data.year for data in tocost_data]
    tocost_tocosts = [data.tocost for data in tocost_data]

    regionpop = Regionpop.objects.all().values()
    mage0s = regionpop.aggregate(Sum('mage0s'))['mage0s__sum']
    fage0s = regionpop.aggregate(Sum('fage0s'))['fage0s__sum']
    mage10s = regionpop.aggregate(Sum('mage10s'))['mage10s__sum']
    fage10s = regionpop.aggregate(Sum('fage10s'))['fage10s__sum']
    mage20s = regionpop.aggregate(Sum('mage20s'))['mage20s__sum']
    fage20s = regionpop.aggregate(Sum('fage20s'))['fage20s__sum']
    mage30s = regionpop.aggregate(Sum('mage30s'))['mage30s__sum']
    fage30s = regionpop.aggregate(Sum('fage30s'))['fage30s__sum']
    mage40s = regionpop.aggregate(Sum('mage40s'))['mage40s__sum']
    fage40s = regionpop.aggregate(Sum('fage40s'))['fage40s__sum']
    mage50s = regionpop.aggregate(Sum('mage50s'))['mage50s__sum']
    fage50s = regionpop.aggregate(Sum('fage50s'))['fage50s__sum']
    mage60s = regionpop.aggregate(Sum('mage60s'))['mage60s__sum']
    fage60s = regionpop.aggregate(Sum('fage60s'))['fage60s__sum']
    mage70s = regionpop.aggregate(Sum('mage70s'))['mage70s__sum']
    fage70s = regionpop.aggregate(Sum('fage70s'))['fage70s__sum']


    context = {
        'table': table,
        'total_pop': total_pop,
        'medical': medical,
        'doc_pop': doc_pop,
        'nur_pop': nur_pop,
        'pat_pop': pat_pop,

        'inrank': inrank, 'outrank': outrank,

        'numtre_years': numtre_years,
        'numtre_numtres': numtre_numtres,
        'tocost_years': tocost_years,
        'tocost_tocosts': tocost_tocosts,

        'regionpop': regionpop, 'mage0s': mage0s, 'fage0s': fage0s,
        'mage10s': mage10s, 'fage10s': fage10s, 'mage20s': mage20s, 'fage20s': fage20s,
        'mage30s': mage30s, 'fage30s': fage30s, 'mage40s': mage40s, 'fage40s': fage40s,
        'mage50s': mage50s, 'fage50s': fage50s, 'mage60s': mage60s, 'fage60s': fage60s, 'mage70s': mage70s,
        'fage70s': fage70s
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


    doctora = Doctor.objects.filter(id__in=[22, 1, 11, 2, 3, 20, 14])
    doctorb = Doctor.objects.filter(id__in=[15, 10, 8, 6, 7, 12, 4, 13, 5])
    doctorc = Doctor.objects.filter(id__in=[9, 17, 18, 16, 23, 24, 19, 21])

    doctor = Doctor.objects.all()

    try:
        df3 = pd.read_csv("C:/finalproject/static/csv/devices.csv")
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
        'v':v,
        'doctor': doctor,
        'doctora': doctora,
        'doctorb': doctorb,
        'doctorc': doctorc,
    }
    return render(request, 'finalapp/second.html', context)


def bubble(request):
    cn = Counts.objects.all()
    return render(request, 'finalapp/bubble.html', {'cn': cn})

def test(request):
    counts = Counts.objects.all().order_by('region')
    cln = counts.aggregate(Sum('clinic'))
    h_c = counts.aggregate(Sum('healthcenter'))
    pha = counts.aggregate(Sum('pharmacy'))
    den = counts.aggregate(Sum('dentist'))
    ori = counts.aggregate(Sum('oriental'))

    result = {
        'counts' : counts,
        'cln' : cln,
        'h_c' : h_c,
        'pha' : pha,
        'den' :den,
        'ori' : ori
    }

    return render(request, 'finalapp/test.html', result)
