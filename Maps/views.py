# -*- coding: utf-8 -*-

from django.template import RequestContext
from django.shortcuts import render_to_response
from Maps.models import *

def home(request):
   data = {}
   return render_to_response("Maps/home.html",data,context_instance=RequestContext(request))
