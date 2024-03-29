# -*- coding: utf-8 -*-

import os

BASE_DIR 		= os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECRET_KEY 		= 'deg3dqboek#1th3u51&un6k@qz34mbm-@3-x0nmv70!lvbjptc'
DEBUG 			= True
ALLOWED_HOSTS 		= []
INSTALLED_APPS 		= (
				'tastypie',
				'Maps',
    				'django.contrib.auth',
    				'django.contrib.contenttypes',
    				'django.contrib.sessions',
    				'django.contrib.messages',
    				'django.contrib.staticfiles',
			)
MIDDLEWARE_CLASSES 	= (
    				'django.contrib.sessions.middleware.SessionMiddleware',
    				'django.middleware.common.CommonMiddleware',
    				'django.middleware.csrf.CsrfViewMiddleware',
    				'django.contrib.auth.middleware.AuthenticationMiddleware',
    				'django.contrib.auth.middleware.SessionAuthenticationMiddleware',
    				'django.contrib.messages.middleware.MessageMiddleware',
    				'django.middleware.clickjacking.XFrameOptionsMiddleware',
    				'django.middleware.security.SecurityMiddleware',
			)
ROOT_URLCONF 		= 'viewport.urls'
TEMPLATES 		= [
    				{
        				'BACKEND': 	'django.template.backends.django.DjangoTemplates',
        				'DIRS': 	[
								os.path.join(BASE_DIR,"viewport","templates"),
							],
        				'APP_DIRS': 	True,
        				'OPTIONS': 	{
            							'context_processors': [
                							'django.template.context_processors.debug',
                							'django.template.context_processors.request',
                							'django.contrib.auth.context_processors.auth',
                							'django.contrib.messages.context_processors.messages',
            							],
        						},
    				},
			]
WSGI_APPLICATION 	= 'viewport.wsgi.application'
DATABASES 		= {
    				'default': {
        				'ENGINE': 	'django.db.backends.sqlite3',
        				'NAME': 	os.path.join(BASE_DIR, 'db.sqlite3'),
    				}
			}
LANGUAGE_CODE 		= 'en-us'
TIME_ZONE 		= 'UTC'
USE_I18N 		= True
USE_L10N 		= True
USE_TZ 			= True
STATIC_URL 		= '/static/'
STATICFILES_DIRS	= (
        			os.path.join(BASE_DIR,"viewport","static"),
        			os.path.join(BASE_DIR,"Maps","static"),
			)
