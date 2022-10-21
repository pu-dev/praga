import graphene

import web_content.schema


class Query(
    web_content.schema.Query,
):
    pass


# class Mutation(
# ):
#     pass


# schema = graphene.Schema(query=Query, mutation=Mutation)
schema = graphene.Schema(query=Query)
