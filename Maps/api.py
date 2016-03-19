from tastypie.authorization import DjangoAuthorization
from tastypie.resources import ModelResource
from Maps.models import * 

class MapMarkerResource(ModelResource):
        class Meta:
                always_return_data      = True
                queryset                = MapMarker.objects.all()
                allowed_methods         = ['get','patch','post','delete','put',]
                excludes                = []
                include_resource_uri    = False
                authorization           = DjangoAuthorization()
