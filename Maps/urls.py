# -*- coding: utf-8 -*-

from django.conf.urls import include, url, patterns
from django.contrib import admin

from tastypie.api import Api
from Maps.api import *
v1_api = Api(api_name='rest')
v1_api.register(MapMarkerResource())

urlpatterns = patterns("Maps", 
    url(r'^api/', include(v1_api.urls) ),
    url(r'^.*',   "views.home",        name='map_home' ),
)
