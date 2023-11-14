import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

interface SetPostsAction {
  type: 'SET_POSTS'
  payload: Post[]
}
interface MarkPostAsLikedAction {
  type: 'MARK_POST_AS_LIKED'
  payload: string // Post ID
}
interface MarkPostAsUnlikedAction {
  type: 'MARK_POST_AS_UNLIKED'
  payload: string // Post ID
}
interface AddPostAction {
  type: 'ADD_POST'
  payload: Post
}
interface SetLikedPostsAction {
  type: 'SET_LIKED_POSTS'
  payload: {
    postId: string
    isLiked: boolean
  }
}

export interface PostState {
  posts: Post[]
}

export type PostAction =
  | SetPostsAction
  | MarkPostAsLikedAction
  | MarkPostAsUnlikedAction
  | AddPostAction
  | SetLikedPostsAction

export const postReducer = (state: PostState, action: PostAction) => {
  switch (action.type) {
    case 'SET_POSTS': {
      return { ...state, posts: action.payload }
    }
    case 'ADD_POST': {
      return { ...state, posts: [action.payload, ...state.posts] }
    }
    case 'MARK_POST_AS_LIKED': {
      const postId = action.payload
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, isLiked: true, numLikes: post.numLikes + 1 } : post
        )
      }
    }
    case 'MARK_POST_AS_UNLIKED': {
      const postId = action.payload
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, isLiked: false, numLikes: post.numLikes - 1 } : post
        )
      }
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
