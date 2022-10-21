from django.contrib import admin
from django.urls import include
from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from .urls_graphql import GraphQLView


urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        "content",
        csrf_exempt(GraphQLView.as_view(graphiql=True)),
        name="graphql-query"
    )
]
