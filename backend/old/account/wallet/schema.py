from django.contrib.auth.models import User
import graphene
from graphql_jwt.decorators import login_required
from .models import Wallet
from .types import WalletType
from .mutations import CreateWallet
from .mutations import UpdateWallet
from .mutations import DeleteWallet


class Query(graphene.ObjectType):
    wallet        = graphene.Field(WalletType, id=graphene.Int())
    wallets       = graphene.List(WalletType)

    @login_required
    def resolve_wallet(self, info, id):
        return Wallet.objects.get(
            id = id,
            user__id=info.context.user.pk
        )

    # @login_required
    def resolve_wallets(self, info):
        return Wallet.objects.filter(
            user__id=info.context.user.pk).order_by('name')


class Mutation(graphene.ObjectType):
    create_wallet = CreateWallet.Field()
    update_wallet = UpdateWallet.Field()
    delete_wallet = DeleteWallet.Field()
