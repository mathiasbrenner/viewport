# -*- coding: utf-8 -*-

from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = (
   url(r'^Maps/', include("Maps.urls")),
   url(r'^',      include("Maps.urls")),
)
