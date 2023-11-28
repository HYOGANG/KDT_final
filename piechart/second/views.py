from django.shortcuts import render
from .models import Hospital, Medicine, Population, Medicalinfo, Counts, Sejong, Regionpop, Inpatrank, Outpatrank, Doctor
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

    return render(request, 'finalapp/dashboard.html', context)

def map(request):
    sejong = Sejong.objects.all()
    return render(request, 'finalapp/map.html', {'sejong' : sejong})

def test(request):
    medicine = Medicine.objects.all()
    jan = medicine.aggregate(Sum('m1'))
    feb = medicine.aggregate(Sum('m2'))
    mar = medicine.aggregate(Sum('m3'))
    apr = medicine.aggregate(Sum('m4'))
    may = medicine.aggregate(Sum('m5'))
    jun = medicine.aggregate(Sum('m6'))
    jul = medicine.aggregate(Sum('m7'))
    aug = medicine.aggregate(Sum('m8'))

    context = {'medicine': medicine,
               'jan': jan, 'feb': feb, 'mar': mar, 'apr': apr,
               'may': may, 'jun': jun, 'jul': jul, 'aug': aug}

    return render(request, 'finalapp/test.html', context)

def test1(request):
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
    context = {'regionpop': regionpop, 'mage0s': mage0s, 'fage0s': fage0s,
               'mage10s': mage10s, 'fage10s': fage10s, 'mage20s': mage20s, 'fage20s': fage20s,
               'mage30s': mage30s, 'fage30s': fage30s, 'mage40s': mage40s, 'fage40s': fage40s,
               'mage50s': mage50s, 'fage50s': fage50s, 'mage60s': mage60s, 'fage60s': fage60s, 'mage70s': mage70s, 'fage70s': fage70s}
    return render(request, 'finalapp/test1.html', context)

def test2(request):
    inrank = Inpatrank.objects.all().values()
    outrank = Outpatrank.objects.all().values()
    context = {'inrank': inrank, 'outrank': outrank}
    return render(request, 'finalapp/test2.html', context)

def second(request):
    counts = Counts.objects.all().order_by('region')
    cln = counts.aggregate(Sum('clinic'))
    h_c = counts.aggregate(Sum('healthcenter'))
    pha = counts.aggregate(Sum('pharmacy'))
    den = counts.aggregate(Sum('dentist'))
    ori = counts.aggregate(Sum('oriental'))
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

    doctor = Doctor.objects.all()
    doctora = Doctor.objects.filter(id__in=[22, 1, 11, 2, 3, 20, 14])
    doctorb = Doctor.objects.filter(id__in=[15, 10, 8, 6, 7, 12, 4, 13, 5])
    doctorc = Doctor.objects.filter(id__in=[9, 17, 18, 16, 23, 24, 19, 21])

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
        'counts': counts,
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
        'doctor': doctor,
        'doctora': doctora,
        'doctorb': doctorb,
        'doctorc': doctorc,
        'cln': cln,
        'h_c': h_c,
        'pha': pha,
        'den': den,
        'ori': ori,
    }
    return render(request, 'finalapp/second.html', context)