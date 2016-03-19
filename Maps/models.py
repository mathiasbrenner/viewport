# -*- coding: utf-8 -*-

from django.db import models

class MapMarker(models.Model):

  address = models.CharField(max_length=300,unique=True,null=False)
  date	= models.DateField(null=False,blank=False,unique=False,auto_now_add=True)
  x	= models.FloatField(max_length=20,default=0)
  y	= models.FloatField(max_length=20,default=0)

  class Meta():	
    app_label 		= 'Maps'
    db_table  		= 'MapsMarker'
    ordering  		= ( 'id', ) 
    unique_together 	= ( 'x', 'y', )

  def setPosition(self,x,y):
    self.x = float(x)
    self.y = float(y)
	
  def getLocation(self):
    return self.x, self.y

  def setAddress(self,adr):
    self.address = str(adr) 
	
  def getAddress(self):
    return self.address

  def save(self):
    if MapMarker.objects.filter(x=self.x,y=self.y,address=self.address).count()>0: 
       raise Exception("Address already exists!")
    models.Model.save(self)
