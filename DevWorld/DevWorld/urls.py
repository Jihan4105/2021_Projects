from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views

from community.views import base_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('community/', include('community.urls')),
    path('common/', include('common.urls')),
    path('index/', base_views.index, name='index'),  # '/' 에 해당되는 path
    path('', auth_views.LoginView.as_view(template_name='common/login.html'), name='login'),
]
