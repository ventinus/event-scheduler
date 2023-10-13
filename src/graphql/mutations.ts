/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
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
export const updateEvent = /* GraphQL */ `
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
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
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
export const createProfile = /* GraphQL */ `
  mutation CreateProfile(
    $input: CreateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    createProfile(input: $input, condition: $condition) {
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
export const updateProfile = /* GraphQL */ `
  mutation UpdateProfile(
    $input: UpdateProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    updateProfile(input: $input, condition: $condition) {
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
export const deleteProfile = /* GraphQL */ `
  mutation DeleteProfile(
    $input: DeleteProfileInput!
    $condition: ModelProfileConditionInput
  ) {
    deleteProfile(input: $input, condition: $condition) {
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
