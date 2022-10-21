import graphene
from graphql_jwt.decorators import login_required
from .models import Operation
from .types import OperationType
from .mutations import CreateOperation
from .mutations import DeleteOperation


class Query(graphene.ObjectType):
    operations = graphene.List(OperationType)

    @login_required
    def resolve_operations(self, info):
        return Operation.objects.filter(user__id=info.context.user.pk).order_by(
            'date', 'cashflow')


class Mutation(graphene.ObjectType):
    create_operation = CreateOperation.Field()
    delete_operation = DeleteOperation.Field()

