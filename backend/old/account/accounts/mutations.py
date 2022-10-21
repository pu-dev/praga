from graphql_jwt.decorators import login_required
import graphene
from asset.models import Asset
from .models import Account
from .types import AccountType






class CreateAccountMoney(graphene.Mutation):
    account = graphene.Field(AccountType)

    class Arguments:
        name     = graphene.String(required=True)
        currency = graphene.String(required=True)

    @login_required
    def mutate(self, info, name, currency):
        user_id = info.context.user.pk

        forex_asset = Asset.objects.filter(
            exchange__eid="FOREX",
            name=currency
        )[0]

        account = Account(
            user_id=user_id,
            asset=forex_asset,
            name=name,
            type=Account.Type.MONEY,
            currency=currency)

        account.save()
        return CreateAccountMoney(account=account)


class CreateAccountStock(graphene.Mutation):
    account = graphene.Field(AccountType)

    class Arguments:
        name       = graphene.String(required=True)
        asset_name = graphene.String(required=True)
        eid        = graphene.String(required=True)

    @login_required
    def mutate(self, info, name, asset_name, eid):
        user_id = info.context.user.pk

        asset = Asset.objects.filter(
            name=asset_name,
            exchange__eid=eid)[0]

        account = Account(
            user_id=user_id,
            asset=asset,
            name=name,
            type=Account.Type.STOCK,
            currency=asset.exchange.currency)

        account.save()
        return CreateAccountMoney(account=account)


class CreateAccountCrypto(graphene.Mutation):
    account = graphene.Field(AccountType)

    class Arguments:
        name   = graphene.String(required=True)
        crypto = graphene.String(required=True)

    @login_required
    def mutate(self, info, name, crypto):
        user_id = info.context.user.pk

        crypto = Asset.objects.get(
            name=f'{crypto}-USD',
            exchange__eid='CC')

        account = Account(
            user_id=user_id,
            asset=crypto,
            name=name,
            type=Account.Type.CRYPTO,
            currency='USD')

        account.save()
        return CreateAccountMoney(account=account)


class DeleteAccount(graphene.Mutation):
    id = graphene.Int()
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.ID(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            account = Account.objects.get(
                pk=id,
                user_id=info.context.user.pk)
            account.delete()
        except:
            return DeleteAccount(ok=False, id=id)


        return DeleteAccount(ok=True, id=id)
