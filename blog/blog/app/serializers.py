from django.contrib.auth.models import User 
from rest_framework import serializers  #serializers taken as inheritance
from .models import *

class UserRegistrationSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, allow_blank=False)
    password = serializers.CharField(required=True)
    first_name = serializers.CharField(required=False, allow_blank=True)
    last_name = serializers.CharField(required=False, allow_blank=True)

    class Meta : 
        model = User
        fields = ['id','username','password','first_name','last_name']

    def create(self, validated_data):
        instance = super(UserRegistrationSerializer, self).create(validated_data)
        instance.set_password(validated_data['password'])
        instance.save()

        return instance

class UserSerializer(serializers.ModelSerializer):


    class Meta :
        model = User
        fields = ['id','username','first_name','last_name']

# Tag serializers
class TagReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = '__all__'


class GetTagsSerializer(serializers.ModelSerializer):
    text = serializers.SerializerMethodField('getAlternateName')

    class Meta :
        model = Tags 
        fields = ['text']

    def getAlternateName(self,objects):
        

        return objects.tag


#Blog serializers
class PostCreateSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required = True)
    description = serializers.CharField(required=False)
    #author = serializers.CharField(required= False)
    tags = serializers.ListField(write_only=True)
    # tags = TagReadSerializer(many=True, read_only=True)


    class Meta :
        model = Blog
        fields = ['title','description','author','tags']

    def create(self,validated_data):
        tags_name  = validated_data.pop('tags')
        print(tags_name)
        b = Blog(**validated_data)
        b.save()
        for tag in tags_name :
            tag_instance = Tags.objects.filter(tag__iexact= tag).first()
            print(tag_instance)
            if tag_instance:
                b.tags.add(tag_instance)
            else:
                new_tag = Tags.objects.create(tag=tag)
                b.tags.add(new_tag)
        return b
     
class PostReadSerializer(serializers.ModelSerializer):
    title = serializers.CharField(required = True)
    description = serializers.CharField(required=False)
    author = UserSerializer()
    tags = TagReadSerializer(many=True, read_only=True)


    class Meta:
        model = Blog
        fields = '__all__'

