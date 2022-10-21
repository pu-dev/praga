from django.contrib import admin
from .models import Asset
from .models import Exchange
from .models import Price


@admin.register(Asset)
class AssetAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'fullname', 'get_exchange_eid', 'globalname')

    # @admin.display(ordering='exchange__name', description='EXCHANGE NAME')
    # def get_exchange_name(self, obj):
    #     return f'{obj.exchange.name}'

    @admin.display(ordering='exchange__eid', description='EXCHANGE NAME')
    def get_exchange_eid(self, obj):
        return f'{obj.exchange.eid}'



@admin.register(Exchange)
class ExchangeAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'code', 'country', 'currency')


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'asset', 
        'get_exchange_eid', 
        'date', 
        'price_open',
        'price_close', 
        'price_close_adjusted', 
    )
    
    @admin.display(ordering='exchange__eid', description='EXCHANGE NAME')
    def get_exchange_eid(self, obj):
        return f'{obj.exchange.eid}'