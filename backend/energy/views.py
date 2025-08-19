from django.shortcuts import render
from rest_framework.decorators import api_view,parser_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from django.contrib.auth.models import User
import pandas as pd
from .models import EnergeyData,CSVFile
from .serializer import EnergyDataSerializer
from django.db.models import Sum,Avg
from django.db.models.functions import Upper,TruncMonth

# Create your views here.

@api_view(["POST"])
def register_user(request):
    try:
        data={}
        username = request.data.get("username")
        password = request.data.get("password")
        repassword = request.data.get("repassword")
        if password != repassword:
            raise Exception("Passoword does not match")
        user = User(username=username)
        user.set_password(password)
        user.save()
        data["msg"] = "User registered successfully"
        state = status.HTTP_200_OK
    except Exception as er:
        data["msg"] = str(er)
        state = status.HTTP_400_BAD_REQUEST
    return Response(data=data,status=state)



@api_view(["POST"])
@parser_classes([MultiPartParser,FormParser])
def upload_csv(request):
    data= {}
    try:
        user = request.user
        file = request.FILES.get("file")
        if not (file.name.endswith(".csv")):
            raise Exception("Only CSV allowed.")
        csv = pd.read_csv(file,sep='\t')
        csvfile = CSVFile.objects.create(uploadby=user,file=file)
        if len(csv) > 200:
            raise Exception("CSV File must contain 100-200 data")
        csv_obj = []
        for idx, row in csv.iterrows():
            csv_obj.append(EnergeyData(csv_file=csvfile,energy_consumption=row["energy_consumption"],price=row["price"],date=row["date"],name=row["name"],city=row["city"]))
        EnergeyData.objects.bulk_create(csv_obj)
        data["msg"] = "File recevied"
        return Response(data=data,status=status.HTTP_200_OK)
    except Exception as er:
        data["msg"] = str(er)
        return Response(data=data,status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def processed_data(reqeust):
    query_set = EnergeyData.objects.all().order_by("-csv_file")
    serializer = EnergyDataSerializer(query_set,many=True)
    return Response(data=serializer.data,status=status.HTTP_200_OK)


@api_view(["GET"])
def dashboard(request):
    data={}
    try:
        city_wise = EnergeyData.objects.annotate(capcity = Upper("city"))\
        .values("capcity").annotate(totalconsum=Sum("energy_consumption"),pricedistribution=Avg("price")).order_by()

        monthwise = EnergeyData.objects.annotate(month=TruncMonth("date"))\
        .values("month").annotate(total_consumtion=Sum("energy_consumption")).order_by("month")

        data["city_wise"] = city_wise
        data["monthwise"] = [{"month":result["month"].strftime("%b"),"total_consumption":result["total_consumtion"]} for result in monthwise]
        return Response(data=data,status=status.HTTP_200_OK)
    except Exception as er:
        data["msg"] = str(er)
        return Response(data=data,status=status.HTTP_400_BAD_REQUEST) 


@api_view(["GET"])
def upload_summary(request):
    data={}
    total_csv = CSVFile.objects.count()
    consumption = EnergeyData.objects.aggregate(avg_consumption=Avg("energy_consumption"))["avg_consumption"] or 0
    data["uploads"] = total_csv
    data["avg"] = consumption
    return Response(data=data,status=status.HTTP_200_OK)