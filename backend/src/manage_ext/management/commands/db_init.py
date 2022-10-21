from .basecmd import BaseCommand
from django.contrib.auth.models import User
from web_content.models import NavItem


class Command(BaseCommand):
    help = 'Initially load db'

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        self.log_ok('Executing: db init')
        emil  = self.create_user('emil',  '123', 'test@test.com', True, True)
        admin = self.create_user('admin', '123', 'tes1@test.com', True, True)

        self.create_nav_item(
            order=1,
            title='Kim jestesmy',
            link='about'
        )

        self.create_nav_item(
            order=2,
            title='Co robimy',
            link='what_we_do'
        )



    def create_user(self, username, password, email, is_staff=False, is_superuser=False):
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except Exception as ex:
            self.log_error(ex)
            self.log_error(f"Can't create user {username}")
            return User.objects.get(username=username)

        user = User.objects.get(username=username)
        user.is_active = True
        user.is_staff = is_staff
        user.is_superuser = is_superuser
        user.save()
        
        self.log_ok(f'Successfully create user: {username} (superuser: {is_superuser})')
        return user


    def create_nav_item(self, order, title, link ):
        item = NavItem(
            order=order,
            title=title,
            link=link
        )

        item.save()
        return item

