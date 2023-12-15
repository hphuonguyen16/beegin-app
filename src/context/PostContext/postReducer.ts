import { PostState, PostAction } from './types'
import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

const addCommentToPost = (post: Post, comment: Comment, parentId: string) => {
  if (!parentId) {
    return {
      ...post,
      comments: [comment, ...post.comments],
      numComments: post.numComments + 1
    }
  } else {
    return {
      ...post,
      numComments: post.numComments + 1,
      comments: post.comments.map((parentComment) => {
        if (parentComment._id === parentId) {
          return {
            ...parentComment,
            numReplies: parentComment.numReplies + 1,
            children: [...(parentComment.children || []), comment]
          }
        } else {
          return parentComment
        }
      })
    }
  }
}

const addReplyCommentsToParentComment = (parentComment: Comment, commentId: string, comments: Comment[]) => {
  if (parentComment._id === commentId) {
    // Add the new reply comments to the parent comment
    const updatedParentComment = {
      ...parentComment,
      children: [...(parentComment.children || []), ...comments]
    }
    return updatedParentComment
  } else {
    return parentComment
  }
}

export const postReducer = (state: PostState, action: PostAction) => {
  switch (action.type) {
    case 'SELECT_POST': {
      return { ...state, selectedPost: action.payload }
    }
    case 'SET_POSTS': {
      return { ...state, posts: action.payload }
    }
    case 'ADD_POST': {
      return { ...state, posts: [action.payload, ...state.posts] }
    }
   
    case 'ADD_COMMENT': {
      const { postId, comment, parentId } = action.payload

      const updatedSelectedPost =
        state.selectedPost?._id === postId
          ? addCommentToPost(state.selectedPost, comment, parentId)
          : state.selectedPost

      const updatedPosts = state.posts.map((post) => {
        if (post._id === postId) {
          return addCommentToPost(post, comment, parentId)
        } else {
          return post
        }
      })

      return {
        ...state,
        selectedPost: updatedSelectedPost,
        posts: updatedPosts
      }
    }
    case 'SET_LIKED_POST': {
      const { postId, isLiked } = action.payload
      return {
        ...state,
        selectedPost:
          state.selectedPost?._id === postId
            ? {
                ...state.selectedPost,
                isLiked,
                numLikes: isLiked ? state.selectedPost.numLikes + 1 : state.selectedPost.numLikes - 1
              }
            : state.selectedPost,
        posts: state.posts.map((post) =>
          post._id === postId
            ? {
                ...post,
                isLiked,
                numLikes: isLiked ? post.numLikes + 1 : post.numLikes - 1
              }
            : post
        )
      }
    }
    default:
      throw new Error()
  }
}
