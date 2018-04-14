from django.conf.urls import url
from . import views


urlpatterns=[
	url(r'^register', views.UserRegistration.as_view(),name = 'registration' ),
	url(r'^login', views.LoginView.as_view(),name = 'login' ),
	url(r'^blog$', views.BlogView.as_view(),name = 'blog' ),
	url(r'^get-tag', views.TagService.as_view(),name = 'get-tag' ),
	url(r'^blogtag', views.BlogTagsDetails.as_view(),name = 'blogtag' ),
	url(r'^blog/(?P<blog_id>[0-9]+)$', views.BlogInfo.as_view(), name='get_blog'),
	
]