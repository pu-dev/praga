from django.db import models
from django.utils.translation import gettext_lazy as _
from graphene_django import DjangoObjectType
import graphene

from .models import Account
from .models import Account


class AccountType(DjangoObjectType):
    class Meta:
        model = Account
        fields = ('id', 'user', 'name', 'currency', 'type', 'asset')


