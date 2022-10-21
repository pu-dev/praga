import graphene
from graphene_django import DjangoObjectType
from .models import Asset
from .models import Exchange


class AssetType(DjangoObjectType):
    globalname = graphene.String()
    eid = graphene.String()

    class Meta:
        model = Asset
        fields = ('id', 'name', 'fullname', 'globalname', 'eid', 'exchange')

    def resolve_globalname(self, info):
        return f'{self.globalname}'

    def resolve_eid(self, info):
        return f'{self.get_eid()}'

class ExchangeType(DjangoObjectType):
    class Meta:
        model = Exchange
        fields = ('id', 'name', 'eid', 'country', 'currency')

