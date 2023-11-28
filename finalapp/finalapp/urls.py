from django.urls import path
from . import views


urlpatterns = [
    path('', views.dashboard_view, name='dashboard'),
    path('board', views.dashboard_view, name='dashboard'),
    path('second', views.second_view, name='second'),
    path('map', views.map),
]