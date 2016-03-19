# -*- coding: utf-8 -*-

from django.conf.urls import include, url, patterns
from django.contrib import admin
import Maps.views
import Maps.api 

api = Maps.api.MapMarkerResource()

urlpatterns = (
    url(r'^api/', include(api.urls) ),
    url(r'^.*',   Maps.views.home,        name='map_home' ),
)
