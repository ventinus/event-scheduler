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

export const vanillaEventsByDate = /* GraphQL */ `
  query EventsByDate(
    $date: String!
    $sortDirection: ModelSortDirection
    $filter: ModelEventFilterInput
    $limit: Int
    $nextToken: String
  ) {
    eventsByDate(
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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

export const getProfileSimple = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
    }
  }
`;

export const simpleUpdateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      title
      date
      description
      status
      image
      createdAt
      updatedAt
      profileEventsId
      owner
    }
  }
`;
