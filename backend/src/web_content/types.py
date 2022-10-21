import graphene
from graphene_django import DjangoObjectType
from .models import NavItem


class NavItemType(DjangoObjectType):
    class Meta:
        model = NavItem
        fields = ('id', 'title', 'order')


