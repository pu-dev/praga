from graphql import GraphQLError
import logging
import datetime
import graphene
from graphql_jwt.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from .models import Wallet
from .types import WalletType

log = logging.getLogger(__name__)


class CreateWallet(graphene.Mutation):
    wallet = graphene.Field(WalletType)

    class Arguments:
        name = graphene.String(required=True)

    @login_required
    def mutate(self, info, name):
        try:
            wallet = Wallet.objects.get(
                user_id=info.context.user.pk,
                name=name
            )
            raise GraphQLError(f'Wallet named \'{name}\' already exists.')
        except ObjectDoesNotExist as ex:
            pass

        try:
            wallet = Wallet(
                user_id=info.context.user.pk,
                name=name)
            wallet.save()
        except Exception as ex:
            raise GraphQLError(f'Failed to create \'{name}\' wallet.')

        return CreateWallet(wallet=wallet)


class UpdateWallet(graphene.Mutation):
    wallet = graphene.Field(WalletType)

    class Arguments:
        wallet_id = graphene.Int(required=True)
        account_ids  = graphene.List(graphene.Int, required=True)

    @login_required
    def mutate(self, info, wallet_id, account_ids):
        # def hack_alert(acc):
        #    log.error(
        #         f"Someone is hacking? user: {info.context.user}; "
        #         f"account: {acc}; "
        #         f"account_money_ids: {account_money_ids}; "
        #         f"account_asset_ex_ids: {account_asset_ex_ids}; "
        #     )

        wallet = Wallet.objects.get(
            id=wallet_id,
            user_id=info.context.user.pk)

        # for acc_id in account_money_ids:
        #     acc = AccountMoney.objects.get(id=acc_id)
        #     if acc.user.id != info.context.user.pk:
        #         hack_alert(acc)
        #         return UpdateWallet(wallet=wallet)

        # for acc_id in account_asset_ex_ids:
        #     acc = AccountAssetExchange.objects.get(id=acc_id)
        #     if acc.user.id != info.context.user.pk:
        #         hack_alert(acc)
        #         return UpdateWallet(wallet=wallet)


        wallet.accounts.set(account_ids)
        wallet.save()

        return UpdateWallet(wallet=wallet)


class DeleteWallet(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        try:
            wallet = Wallet.objects.get(id=id, user_id=info.context.user.pk)
        except Exception as ex:
            return DeleteWallet(ok=False)

        wallet.delete()
        return DeleteWallet(ok=True)

