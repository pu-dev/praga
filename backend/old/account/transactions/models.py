from django.db import models
from django.contrib.auth.models import User
# from account.accounts.types import AccountTypes
from account.operations.models import Operation


class Transaction(models.Model):
    id = models.AutoField(primary_key=True)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    
    credit_op = models.ForeignKey(
        Operation, 
        on_delete=models.DO_NOTHING,
        related_name='credit_op_id')
    
    debit_op = models.ForeignKey(
        Operation, 
        on_delete=models.DO_NOTHING,
        related_name='debit_op_id')

    def __str__(self):
        return (f'id: {self.id}, '
            f'credit_op_id: {self.credit_op_id}, '
            f'debit_op_id: {self.debit_op_id}, '
        )
