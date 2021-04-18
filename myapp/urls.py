from django.contrib import admin
from django.urls import path
from . import views

app_name = 'myapp'

urlpatterns = [
    path('',views.index, name='index'),
    path('predicting/',views.predicting, name='predicting'),
    path('training/', views.training, name='training'),
]