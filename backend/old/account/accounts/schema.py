import graphene
from graphql_jwt.decorators import login_required
from .models import Account

from .types import AccountType

from .mutations import CreateAccountMoney
from .mutations import CreateAccountStock
from .mutations import CreateAccountCrypto

from .mutations import DeleteAccount


class QueryAccount(graphene.ObjectType):
    accounts        = graphene.List(AccountType)
    accounts_money  = graphene.List(AccountType)
    accounts_stock  = graphene.List(AccountType)
    accounts_crypto = graphene.List(AccountType)
    accounts_user   = graphene.List(AccountType)

    @login_required
    def resolve_accounts(self, info):
        return Account.objects.filter(
            user__id=info.context.user.pk
        ).order_by('type', 'name')

    @login_required
    def resolve_accounts_money(self, info):
        return Account.objects.filter(
            user__id=info.context.user.pk,
            type=Account.Type.MONEY
        )

    @login_required
    def resolve_accounts_stock(self, info):
        return Account.objects.filter(
            user__id=info.context.user.pk,
            type=Account.Type.STOCK
        )

    @login_required
    def resolve_accounts_crypto(self, info):
        return Account.objects.filter(
            user__id=info.context.user.pk,
            type=Account.Type.CRYPTO
        )

    @login_required
    def resolve_accounts_user(self, info):
        return Account.objects.filter(
            user__id=info.context.user.pk,
            type=Account.Type.USER
        )



class Mutation(graphene.ObjectType):
    delete_account = DeleteAccount.Field()

    create_account_money  = CreateAccountMoney.Field()
    create_account_stock  = CreateAccountStock.Field()
    create_account_crypto = CreateAccountCrypto.Field()

