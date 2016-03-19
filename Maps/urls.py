# -*- coding: utf-8 -*-

from django.conf.urls import include, url, patterns
from django.contrib import admin

urlpatterns = patterns("Maps", 
   url(r'^.*', "views.home", name='map' ),
)
