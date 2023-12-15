import { PostState, PostAction} from './types'



export const postReducer = (state: PostState, action: PostAction) => {
  switch (action.type) {
    case 'SET_POSTS': {
      return { ...state, posts: action.payload }
    }
    case 'ADD_POST': {
      return { ...state, posts: [action.payload, ...state.posts] }
    }
    case 'ADD_MULTIPLE_POSTS': {
      const { payload: multiplePosts } = action;
    
      const updatedPosts = [...state.posts, ...multiplePosts];
    
      const uniquePostsSet = new Set(updatedPosts.map(post => post._id));
    
      const uniquePostsArray = Array.from(uniquePostsSet);
    
      const uniquePosts = uniquePostsArray.map(postId =>
        updatedPosts.find(post => post._id === postId)
      );
    
      return {
        ...state,
        posts: uniquePosts,
      };
    }
    case 'ADD_MULTIPLE_COMMENTS': {
      const { postId, comments, totalComments } = action.payload;
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                comments: Array.from(new Set([...post.comments, ...comments])),
                totalComments,
              }
            : post
        ),
      };
    }
    case 'ADD_COMMENT': {
      const { postId, comment, parentId } = action.payload;
    
      if (!parentId) {
        // If there is no commentReplyToId, add the comment to the post's comments array
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === postId
              ? { ...post, comments: [comment, ...post.comments], numComments: post.numComments + 1 }
              : post
          ),
        };
      } else{
        return {
          ...state,
          posts: state.posts.map((post) => {
            if (post._id === postId) {
              return {
                ...post,
                numComments: post.numComments + 1,
                comments: post.comments.map((parentComment) => {
                  if (parentComment._id === parentId) {
                    // Add the new comment as a child to the parent comment
                    const updatedParentComment = {
                      ...parentComment,
                      numReplies: parentComment.numReplies + 1,
                      children: [...(parentComment.children || []), comment],
                    };
                    return updatedParentComment;
                  } else {
                    return parentComment;
                  }
                }),
              };
            } else {
              return post;
            }
          }),
        };
      }
    }
    
    case 'ADD_REPLY_COMMENTS': {
      const { postId, commentId, comments } = action.payload;

      return {
        ...state,
        posts: state.posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.map((parentComment) => {
                if (parentComment._id === commentId) {
                  // Add the new reply comments to the parent comment
                  const updatedParentComment = {
                    ...parentComment,
                    children: [...(parentComment.children || []), ...comments],
                  };
                  return updatedParentComment;
                } else {
                  return parentComment;
                }
              }),
            };
          } else {
            return post;
          }
        }),
      };
    }
    case 'SET_LIKED_POSTS': {
      const { postId, isLiked } = action.payload
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === postId ? { ...post, isLiked } : post))
      }
    }
    default:
      throw new Error()
  }
}
