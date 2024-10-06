import { Resolver, Query } from '@nestjs/graphql';

// This is a placeholder resolver to prevent the GraphQL schema from being empty
@Resolver()
export class PhotoResolver {
  @Query(() => String)
  EmptyResolver() {
  }
}
