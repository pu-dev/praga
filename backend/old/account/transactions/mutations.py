import graphene
from graphql_jwt.decorators import login_required
from account.operations.models import Operation
from account.operations.mutations import create_opeation
from .models import Transaction
from .types import TransactionType


class OperationInputType(graphene.InputObjectType):
    account_id = graphene.Int(required=True)
    qty_change = graphene.Float(required=True)
    cashflow   = graphene.Float(required=True)
    note       = graphene.String(required=False)


class CreateTransaction(graphene.Mutation):
    transaction = graphene.Field(TransactionType)

    class Arguments:
        date = graphene.String(required=True)
        op_credit = OperationInputType(required=True)
        op_debit  = OperationInputType(required=True)

    @login_required
    def mutate(self, info, date, op_credit, op_debit):
        user_id = info.context.user.pk

        credit_op = create_opeation(
            user_id, 
            op_credit.account_id, 
            op_credit.qty_change,
            op_credit.cashflow,
            date,
            op_credit.note
        )

        debit_op = create_opeation(
            user_id, 
            op_debit.account_id, 
            op_debit.qty_change,
            op_debit.cashflow,
            date,
            op_debit.note
        )

        transaction = Transaction(
            user_id=user_id,
            credit_op=credit_op,
            debit_op=debit_op
        )

        transaction.save()
        return CreateTransaction(transaction=transaction)


class DeleteTransaction(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user_id = info.context.user.pk

        try:
            transaction = Transaction.objects.get(
                id=id,
                user_id=user_id
            )
        except Exception as ex:
            return DeleteTransaction(ok=False)

        transaction.delete()

        return DeleteTransaction(ok=True)


class DeleteTransactionTree(graphene.Mutation):
    ok = graphene.Boolean()

    class Arguments:
        id = graphene.Int(required=True)

    @login_required
    def mutate(self, info, id):
        user_id = info.context.user.pk

        try:
            transaction = Transaction.objects.get(
                id=id,
                user_id=user_id
            )
            credit_op = Operation.objects.get(
                id=transaction.credit_op_id,
                user_id=user_id
            )
            debit_op = Operation.objects.get(
                id=transaction.debit_op_id,
                user_id=user_id
            )
        except Exception as ex:
            return DeleteTransaction(ok=False)

        transaction.delete()
        credit_op.delete()
        debit_op.delete()

        return DeleteTransaction(ok=True)



