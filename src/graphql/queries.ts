/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getProfile = /* GraphQL */ `
  query GetProfile($id: ID!) {
    getProfile(id: $id) {
      id
      name
      events {
        items {
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
        nextToken
      }
      description
      image
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listProfiles = /* GraphQL */ `
  query ListProfiles(
    $filter: ModelProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        events {
          nextToken
        }
        description
        image
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEvent = /* GraphQL */ `
  query GetEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      date
      description
      status
      profile {
        id
        name
        events {
          nextToken
        }
        description
        image
        createdAt
        updatedAt
        owner
      }
      image
      createdAt
      updatedAt
      profileEventsId
      owner
    }
  }
`;
export const listEvents = /* GraphQL */ `
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
        profile {
          id
          name
          description
          image
          createdAt
          updatedAt
          owner
        }
        image
        createdAt
        updatedAt
        profileEventsId
        owner
      }
      nextToken
    }
  }
`;
export const eventsByDate = /* GraphQL */ `
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
        profile {
          id
          name
          description
          image
          createdAt
          updatedAt
          owner
        }
        image
        createdAt
        updatedAt
        profileEventsId
        owner
      }
      nextToken
    }
  }
`;
export const searchEvents = /* GraphQL */ `
  query SearchEvents(
    $filter: SearchableEventFilterInput
    $sort: [SearchableEventSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableEventAggregationInput]
  ) {
    searchEvents(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        title
        date
        description
        status
        profile {
          id
          name
          description
          image
          createdAt
          updatedAt
          owner
        }
        image
        createdAt
        updatedAt
        profileEventsId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
