from pathlib import Path
import os
import logging

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'd)%c3-hh2q2i#d)%c3-hh*b2i#yf6in2i#d)%c3-h3cb(@%7%'

DEBUG = True

ALLOWED_HOSTS = [
    'localhost', 
    '127.0.0.1', 
    'praga-be.codeblock.it',
    'praga.codeblock.it'
]


INSTALLED_APPS = [
    'manage_ext.app.ManageExtConfig',

    'web_content.app.WebContentConfig',
    # 'asset.app.AssetConfig',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'graphene_django',
    'corsheaders'
]


MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = 'praga.urls'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'praga.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db', 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

STATIC_URL = '/static/'

# STATIC_ROOT = '/var/www/virtuals/richee/richee-be/static/'
# MEDIA_ROOT = '/var/www/virtuals/richee/richee-be/upload'


API_LIVE_DOCUMENTATION = {
    'ENABLED': True
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'root': {
        'level': 'DEBUG',
        'handlers': ['file', 'console'],
        'propagate': True
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'color',


        },
        'file': {
            # 'level': 'WARNING',
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'maxBytes': 1024*1024*4,  # 4 mb
            'backupCount': 5,
            'filename': os.path.join(BASE_DIR, 'log', 'run.log'),
            'formatter': 'simple',

        },
    },
    'formatters': {
        'simple': {
            'format': '[{levelname} {asctime} {module}] {message}',
            'datefmt': '%Y-%m-%d %H:%M:%S',
            'style': '{',
        },
        'simple_console': {

            'format': '{levelname} {module}:{lineno}  {message}',
            # 'format': '{levelname} {pathname}:{lineno}  {message}',
            'datefmt': '%m-%d %H:%M:%S',
            'style': '{',
        },    

        'color': {
            '()': 'colorlog.ColoredFormatter',
            'format': '%(log_color)s%(levelname)-8s %(message)s',
            'log_colors': {
                'DEBUG':    'cyan',
                # 'DEBUG':    'bold_black',
                'INFO':     'white',
                'WARNING':  'yellow',
                'ERROR':    'red',
                'CRITICAL': 'red,bg_white',
                # 'CRITICAL': 'bold_red',
            },
        },




    },
}


GRAPHENE = {
    "SCHEMA": "praga.schema.schema",
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

# # Graphql jwt
# AUTHENTICATION_BACKENDS = [
#     'graphql_jwt.backends.JSONWebTokenBackend',
#     'django.contrib.auth.backends.ModelBackend',
# ]

# CORS_ALLOWED_ORIGINS=[
#    "https://www.3manuals.com"
# ]

CORS_ALLOW_ALL_ORIGINS = True

DEFAULT_AUTO_FIELD='django.db.models.AutoField' 

# EOD_HISTORICAL_DATA = {
#     "URI_EOD"      : "https://eodhistoricaldata.com/api/eod",
#     "URI_EXCHANGES": "https://eodhistoricaldata.com/api/exchanges-list",
#     "API_TOKEN": "621cfc7c5b60c6.89772414"
# }
