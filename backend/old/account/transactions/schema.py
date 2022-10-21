import graphene
from graphql_jwt.decorators import login_required
from .models import Transaction
from .types import TransactionType
from .mutations import CreateTransaction
from .mutations import DeleteTransaction


class Query(graphene.ObjectType):
    transactions = graphene.List(TransactionType)

    @login_required
    def resolve_transactions(self, info):
        return Transaction.objects.filter(user__id=info.context.user.pk
            ).order_by('-credit_op__date')


class Mutation(graphene.ObjectType):
    create_transaction = CreateTransaction.Field()
    delete_transaction = DeleteTransaction.Field()

