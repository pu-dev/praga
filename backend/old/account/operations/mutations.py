import logging
import datetime
import graphene
from django.db import models
from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from graphql_jwt.decorators import login_required
from graphql import GraphQLError
from account.accounts.models import Account
from account.transactions.models import Transaction
from .models import Operation
from .types import OperationType


log = logging.getLogger(__name__)

def create_opeation(
    user_id,
    account_id, 
    qty_change, 
    cashflow, 
    op_date, 
    note):

    log.debug(
        f'Create operation: '
        f'acc_id: {account_id}, '
        f'op_date: {op_date}, '
        f'qty_change: {qty_change}, '
        f'cashflow: {cashflow}, '
        f'note: {note}'
    )

    account = Account.objects.get(
        pk=account_id,
        user_id=user_id
    )

    date_cnv = datetime.datetime.strptime(op_date, "%Y%m%d").date()

    operation = Operation(
        user_id=user_id,
        account=account,
        qty_change=qty_change,
        cashflow=cashflow,
        date=date_cnv,
        note=note
    )

    operation.save()
    log.debug("Operation created")
    return operation


class CreateOperation(graphene.Mutation):
    operation = graphene.Field(OperationType)

    class Arguments:
        account_id = graphene.Int(required=True)
        qty_change = graphene.Float(required=True)
        cashflow = graphene.Float(required=True)
        date = graphene.String(required=True)
        note = graphene.String(required=False)

    @login_required
    def mutate(self, info, account_id, qty_change, cashflow, date, note):
        operation = create_opeation(
            info.context.user.pk, 
            account_id, 
            qty_change, 
            cashflow, 
            date, 
            note
        )
        return CreateOperation(operation=operation)


class DeleteOperation(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):

        query_filter = Q(credit_op_id=id) | Q(debit_op_id=id)
        trans = Transaction.objects.filter(query_filter)

        if len(trans) > 0:
            raise GraphQLError("Operation is a part of transaction. Delete transaction instead.")

        try:
            operation = Operation.objects.get(
                id=id,
                user_id=info.context.user.pk
            )

        except ObjectDoesNotExist as ex:
            raise GraphQLError("Operation does not exist.")

        operation.delete()
        
        return DeleteOperation(ok=True)

