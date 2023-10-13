export const vanillaListEvents = /* GraphQL */ `
  query ListEvents(
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEvents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        date
        description
        status
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
