from django.db import models
from django.contrib.auth.models import User
from account.accounts.models import Account


class Operation(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    date = models.DateField(blank=False)
    qty_change = models.FloatField(blank=False)
    cashflow = models.FloatField(blank=False)
    note = models.TextField()

    def __str__(self):
        return (f'id: {self.id}, '
            f'account: {self.account}, '
            f'date: {self.date}, '
            f'qty_change: {self.qty_change}',
            f'cashflow: {self.cashflow}')

