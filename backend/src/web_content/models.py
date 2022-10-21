from django.db import models


class NavItem(models.Model):
    # class Type(models.TextChoices):
    #     MONEY  = 'MONEY',  _('Money')
    #     STOCK  = 'STOCK',  _('Stock')
    #     CRYPTO = 'CRYPTO', _('Crypto')
    #     USER   = 'USER',   _('User')

    # class Meta:
    #     unique_together = ('user', 'name', 'currency', 'type')

    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=32, unique=False, blank=False)
    link  = models.CharField(max_length=32, unique=False, blank=False)
    order = models.IntegerField(blank=True)

    # def __str__(self):
    #     return (f'id: {self.id}, '
    #         f'user: {self.user}, '
    #         f'name: {self.name}, '
    #         f'type: {self.type}, '
    #         f'currency: {self.currency}')

