from django.db import models

class Exchange(models.Model):
    id = models.AutoField(primary_key=True)
    
    name     = models.CharField(max_length=64, unique=True, blank=False)
    eid      = models.CharField(max_length=32, unique=True, blank=False)
    country  = models.CharField(max_length=32, unique=False, blank=False)
    currency = models.CharField(max_length=3, blank=False)

    @property
    def code(self):
        return self.eid

    def __str__(self):
        return (
            f'id: {self.id}, '
            f'eid: {self.eid}, '
            f'name: {self.name}, '
            f'country: {self.country}, '
            f'currency: {self.currency}, '                        
        )

class Asset(models.Model):
    id = models.AutoField(primary_key=True)
    name     = models.CharField(max_length=32)
    fullname = models.CharField(max_length=64)
    exchange = models.ForeignKey(Exchange, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('name', 'exchange',)

    @property
    def globalname(self):
        return f'{self.name}.{self.exchange.eid}'

    @property
    def eid(self):
        return f'{self.exchange.eid}'

    def get_eid(self):
        return f'{self.exchange.eid}'

    def __str__(self):
        return f'{self.name}'


class Price(models.Model):
    id            = models.AutoField(primary_key=True)
    asset         = models.ForeignKey(Asset, on_delete=models.CASCADE)
    exchange      = models.ForeignKey(Exchange, on_delete=models.CASCADE)
    date          = models.DateField(blank=False)
    price_open    = models.FloatField(blank=False)
    price_close   = models.FloatField(blank=False)
    price_close_adjusted = models.FloatField(blank=False)

    
    class Meta:
        unique_together = ('asset', 'exchange', 'date')


    def __str__(self):
        return (
            f'asset: {self.asset}, '
            f'exchange: {self.exchange}, '
            f'date: {self.date}, '
            f'price_open: {self.price_open}, '
            f'price_close: {self.price_close}, '
            f'price_close_adjusted: {self.price_close_adjusted}, '
        )


