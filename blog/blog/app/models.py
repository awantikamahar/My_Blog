import uuid

from django.db import models
from django.contrib.auth.models import User
# Create your models here.

# attr - title, author(user), tags(manyTOmany), description, created_on, updated_on

class UserProfile(models.Model):
	profile_photo = models.FileField(null=True, blank=True)
	user = models.OneToOneField(User, on_delete=models.CASCADE)
	occupation = models.CharField(max_length=20)

	def __str__(self):
		return self.user.email

class Tags(models.Model):
	tag = models.CharField(max_length=50)

	def __str__(self):
		return self.tag

class Blog(models.Model):
	
	title = models.CharField(max_length=100)
	author = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='author', null=True)
	tags = models.ManyToManyField(Tags)
	description = models.TextField(max_length=10000)
	created_on = models.DateTimeField(auto_now_add=True)
	updated_on = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.title
