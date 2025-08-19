from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class CSVFile(models.Model):
    uploadby = models.ForeignKey(to=User,on_delete=models.DO_NOTHING)
    file = models.FileField(upload_to="file")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class EnergeyData(models.Model):
    csv_file = models.ForeignKey(to=CSVFile,on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=50,null=True)
    city = models.CharField(max_length=50,null=False)
    energy_consumption = models.FloatField(max_length=5,default=0.00)
    date = models.DateField()
    price = models.DecimalField(decimal_places=2,max_digits=10,default=0.00)