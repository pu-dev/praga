from django.core.management.base import BaseCommand as DjangoCommand

class BaseCommand(DjangoCommand):
    def log_ok(self, msg):
        self.stdout.write(self.style.SUCCESS(msg))

    def log_error(self, msg):
        self.stdout.write(self.style.ERROR(msg))

    def log_warn(self, msg):
        self.stdout.write(self.style.WARNING(msg))        