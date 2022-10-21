import graphene
from .models import NavItem
from .types import NavItemType


class Query(graphene.ObjectType):
    nav_items = graphene.List(NavItemType)

    def resolve_nav_items(self, info):
        return NavItem.objects.all()
