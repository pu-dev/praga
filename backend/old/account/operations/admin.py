from django.contrib import admin
from .models import Operation


@admin.register(Operation)
class OperationAdmin(admin.ModelAdmin):
    list_display = (
        'id', 
        'account', 
        'date', 
        'qty_change', 
        'cashflow'
    )

