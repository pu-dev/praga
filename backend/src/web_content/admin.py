from django.contrib import admin
from .models import NavItem


@admin.register(NavItem)
class NavItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'order')

    # @admin.display(ordering='asset__name', description='ASSET NAME')
    # def get_asset_globalname(self, obj):
    #     return f'{obj.asset.globalname}'