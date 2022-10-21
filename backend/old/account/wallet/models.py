from django.db import models
from django.contrib.auth.models import User
from account.accounts.models import Account
# from account.accounts.models import AccountAssetExchange


class Wallet(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=8, unique=True, blank=False)
    accounts = models.ManyToManyField('Account')
