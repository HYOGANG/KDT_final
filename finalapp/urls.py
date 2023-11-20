from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard_view),
    path('board/', views.dashboard_view),
    path('map/', views.map),
]