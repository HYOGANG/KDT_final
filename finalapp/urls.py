from django.urls import path
from django.contrib import admin
from . import views

urlpatterns = [
    path('', views.index),
    path('map/',views.map ),
    path('test/', views.test),
    path('show/', views.show),

    path('admin/', admin.site.urls),
]