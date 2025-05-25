export const CREATE_POST = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(createPostInput: $input) {
      id
      title
      address
      neighborhood
    }
  }
`;


export const UPDATE_POST = `
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(updatePostInput: $input) {
      id
      title
      description
      floodLevel
      address
      neighborhood
    }
  }
`;

export const DELETE_POST = `
  mutation DeletePost($id: Float!) {
    removePost(id: $id) {
      id
      title
    }
  }
`;