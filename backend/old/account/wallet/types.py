from graphene_django import DjangoObjectType
from .models import Wallet


class WalletType(DjangoObjectType):
    class Meta:
        model = Wallet
        fields = (
            'id', 
            'name',
            'accounts', 
        )
