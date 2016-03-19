# -*- coding: utf-8 -*-

from tastypie.authentication import Authentication
from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from Maps.models import * 

class MapMarkerResource(ModelResource):

  class Meta:
    resource_name 	    = 'marker'
    always_return_data      = True
    queryset                = MapMarker.objects.all()
    allowed_methods         = ['get','patch','post','delete','put',]
    excludes                = []
    include_resource_uri    = True
    authentication          = Authentication()
    authorization           = Authorization() 

