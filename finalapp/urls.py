from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('board/', views.dashboard_view, name='dashboard'),
    path('map/', views.map),
    path('test/', views.test),
]