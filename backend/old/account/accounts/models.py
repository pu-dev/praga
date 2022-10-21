from django.contrib.auth.models import User
from django.db import models
from django.utils.translation import gettext_lazy as _
from asset.models import Asset


class Account(models.Model):
    class Type(models.TextChoices):
        MONEY  = 'MONEY',  _('Money')
        STOCK  = 'STOCK',  _('Stock')
        CRYPTO = 'CRYPTO', _('Crypto')
        USER   = 'USER',   _('User')

    class Meta:
        unique_together = ('user', 'name', 'currency', 'type')

    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32, unique=False, blank=False)
    asset = models.ForeignKey(Asset, on_delete=models.PROTECT)
    currency = models.CharField(max_length=3, blank=False)
    type = models.CharField(
        max_length=6,
        choices=Type.choices
    )


    def __str__(self):
        return (f'id: {self.id}, '
            f'user: {self.user}, '
            f'name: {self.name}, '
            f'type: {self.type}, '
            f'currency: {self.currency}')

