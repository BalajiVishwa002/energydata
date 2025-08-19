from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView

urlpatterns = [
    path("register/",views.register_user),
    path("login/",TokenObtainPairView.as_view(),name="login_token"),
    path("upload-csv/",views.upload_csv),
    path("processed-data/",views.processed_data),
    path("dashboard/",views.dashboard),
    path("uploads-summary/",views.upload_summary)
]