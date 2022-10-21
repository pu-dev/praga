from django.contrib import admin
from .models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'type', 'currency')

    # @admin.display(ordering='asset__name', description='ASSET NAME')
    # def get_asset_globalname(self, obj):
    #     return f'{obj.asset.globalname}'