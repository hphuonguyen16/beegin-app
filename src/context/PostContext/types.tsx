import { Post } from '@/types/post'
import { Comment } from '@/types/comment'

interface AddPostAction {
  type: 'ADD_POST'
  payload: Post
}

interface AddMultiplePostsAction {
  type: 'ADD_MULTIPLE_POSTS'
  payload: Post[]
}

interface AddMultipleCommentsAction {
  type: 'ADD_MULTIPLE_COMMENTS'
  payload: {
    postId: string
    comments: Comment[]
    totalComments: number
  }
}

interface AddReplyCommentsAction {
  type: 'ADD_REPLY_COMMENTS'
  payload: {
    postId: string
    commentId: string
    comments: Comment[]
  }
}

interface SetLikedPostsAction {
  type: 'SET_LIKED_POSTS'
  payload: {
    postId: string
    isLiked: boolean
  }
}

interface AddCommentAction {
  type: 'ADD_COMMENT'
  payload: {
    postId: string
    comment: Comment
    parentId: string
  }
}

interface SelectPostAction {
  type: 'SELECT_POST'
  payload: Post
}

export interface PostState {
  posts: Post[]
  selectedPost: Post | null
}

interface SetPostsAction {
  type: 'SET_POSTS'
  payload: Post[]
}

interface SetLikedPostAction {
  type: 'SET_LIKED_POST'
  payload: {
    postId: string
    isLiked: boolean
  }
}

export type PostAction =
  | SetPostsAction
  | AddPostAction
  | SetLikedPostsAction
  | AddCommentAction
  | AddMultiplePostsAction
  | AddMultipleCommentsAction
  | AddReplyCommentsAction
  | SelectPostAction
  | SetLikedPostAction
