from django.shortcuts import render
from .models import *
from .serializers import *

from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.utils import timezone
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q
from django.core.mail import EmailMultiAlternatives


from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_jwt.settings import api_settings

from annoying.functions import get_object_or_None
from datetime import date


jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

# Create your views here.
class UserRegistration(APIView):
	permission_classes = (AllowAny,)
	def post(self,request):
		if request.data :
			username = request.data.get('username',None)
			user = User.objects.filter(username = username).first()
			print("This is data", request.data)
			if not user :
				serializers = UserRegistrationSerializer(data = request.data)
				print(serializers)
				if serializers.is_valid():
					serializers.save()

					return JsonResponse({'message':'User Registered Successfully'}, status=200)
				return Response(serializers.errors)
			return JsonResponse({'message':'User already exist'}, status=400)
		return JsonResponse({'message':'Bad Request'}, status=400)


class LoginView(APIView):
	permission_classes = (AllowAny,)
	def post(self,request):
		if request.data :
			username = request.data.get('username',None)
			password = request.data.get('password',None)
			print(request.data)
			if username and password :
				user = authenticate(username = username, password = password)
				if user : 
					payload = jwt_payload_handler(user)
					token = jwt_encode_handler(payload)
					serializers = UserSerializer(user)
					return JsonResponse({'user':serializers.data, 'token': token, 'status':True})
				return JsonResponse({'message':'Worng username or password', 'status':False}, status=400)
			return JsonResponse({'message':'User doesn\'t exist', 'status':False}, status=400)
		return JsonResponse({'message':'Bad Request'}, status=400)

class BlogView(APIView):
	#permission_classes = (AllowAny,)
	def post(self,request):
		if request.data:
			print("*************requested.data",request.data)
			tags = request.data.get('tags',None)
			serializer = PostCreateSerializer(data=request.data)

			if serializer.is_valid():
				print("************************serializer.is_valid")
				serializer.save()
				print("************serializer.is saved")
				
				return  JsonResponse({'message':'Blog Uploaded Successfully'}, status=200)
			print(serializer.errors)
			return JsonResponse({'message':'Bad String'}, status  =400)
		return JsonResponse({'message':'Bad Request'}, status=400)


class BlogTagsDetails(APIView):
	permission_classes = (AllowAny,)
	def get(self,request):
		blog = Blog.objects.all()
		print(blog)
		serializer = PostReadSerializer(blog, many = True)
		return Response(serializer.data)

class TagService(APIView):
	permission_classes = (AllowAny,)
	def get(self,request):
		tag = Tags.objects.all()
		serializer = GetTagsSerializer(tag, many = True)
		return Response(serializer.data)

class BlogInfo(APIView):
	permission_classes = (AllowAny,)
	def get(self,request,blog_id):
		blogid = Blog.objects.filter(id=blog_id).first()
		print("blogid :", blogid)
		serializer = PostReadSerializer(blogid)
		print(serializer)
		return JsonResponse({'blog':serializer.data,'status':True})






		#return JsonResponse({'message':'Blog Uploaded Successfully'}, status=200)










