import graphene
from graphene_django import DjangoObjectType
from .models import Operation
from account.accounts.types import AccountType
from account.accounts.models import Account

class OperationType(DjangoObjectType):
    account = graphene.Field(AccountType)
    date_txt = graphene.String()

    class Meta:
        model = Operation
        fields = (
            'id', 
            'account', 
            'date_txt', 
            'qty_change', 
            'cashflow', 
            'note')

    def resolve_date_txt(self, info):
        return str(self.date)

