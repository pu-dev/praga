from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView as BaseGraphQLView
from django.urls import path


class GraphQLView(BaseGraphQLView):
    # It allows APIExcepiton to add custom context
    @staticmethod
    def format_error(error):
        formatted_error = super(GraphQLView, GraphQLView).format_error(error)
        try:
            formatted_error['context'] = error.original_error.context
        except AttributeError:
            pass

        return formatted_error


urlpatterns = [
    path(
        "content",
        csrf_exempt(GraphQLView.as_view(graphiql=True)),
        name="graphql-query"
    )
]
