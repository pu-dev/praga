import graphene
from graphene_django import DjangoObjectType
from .models import Transaction


class TransactionType(DjangoObjectType):
    class Meta:
        model = Transaction
        fields = (
            'id', 
            'credit_op', 
            'debit_op')