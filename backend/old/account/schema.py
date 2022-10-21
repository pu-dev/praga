from .accounts import schema as accounts_schema
from .operations import schema as operations_schema
from .transactions import schema as transactions_schema
from .wallet import schema as wallet_schema


class QueryAll(
    accounts_schema.QueryAccount,
    operations_schema.Query,
    transactions_schema.Query,
    wallet_schema.Query

):
    pass


class MutationAll(
    accounts_schema.Mutation,
    operations_schema.Mutation,
    transactions_schema.Mutation,
    wallet_schema.Mutation
):
    pass
