export const GET_MY_POSTS = `
  query {
    myPosts {
      id
      title
      description
      floodLevel
      address
      neighborhood
      city {
        id
        name
        state {
          id
          name
          uf
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_STATES_AND_CITIES = `
  query {
    states {
      id
      name
      cities {
        id
        name
      }
    }
  }
`;

