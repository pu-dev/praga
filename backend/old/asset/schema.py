import graphene
from .models import Asset
from .models import Exchange
from .types import AssetType
from .types import ExchangeType
from graphql_jwt.decorators import login_required
from django.db.models import Q


EXCHNAGES_NOT_STOCK = ["FOREX", "CC"]

class Query(graphene.ObjectType):
    assets             = graphene.List(AssetType)
    assets_on_exchange = graphene.List(
                            AssetType,
                            eid=graphene.String()
                        )
    exchanges          = graphene.List(ExchangeType)
    exchanges_stock    = graphene.List(ExchangeType)

    @login_required
    def resolve_assets(self, info):
        return Asset.objects.all().order_by('exchange__name','name')


    @login_required
    def resolve_assets_on_exchange(self, info, eid):
        print(eid)
        return Asset.objects.filter(
            exchange__eid=eid
        ).order_by('exchange__name','name')

    @login_required
    def resolve_exchanges(self, info):
        return Exchange.objects.all().order_by('eid')

    @login_required
    def resolve_exchanges_stock(self, info):
        return Exchange.objects.filter(
            ~Q(eid__in=EXCHNAGES_NOT_STOCK)
        ).order_by('eid')
