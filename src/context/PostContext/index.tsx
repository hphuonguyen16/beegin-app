import React, { createContext, useContext, useState, useEffect, ReactNode, useReducer } from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import urlConfig from '@/config/urlConfig'
import { Post } from '@/types/post'
import { PostState, PostAction, postReducer } from './postReducer'
import { useAuth } from '../AuthContext'

export enum ActionType {
  FETCH_POSTS = 'FETCH_POSTS',
  MARK_POST_AS_LIKED = 'MARK_POST_AS_LIKED',
  MARK_POST_AS_UNLIKED = 'MARK_POST_AS_UNLIKED'
}

// Create the context
export interface PostContextType {
  postsState: PostState
  postsDispatch: React.Dispatch<PostAction>
}

const PostContext = createContext<PostContextType | undefined>(undefined)

// Custom hook to access the context
export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error('useContext must be used within an PostProvider')
  }
  return context
}

// Create a provider component
interface PostProviderProps {
  children: ReactNode
}

export function PostProvider({ children }: PostProviderProps) {
  // post data comment data and children data and store the post and comment which user like
  const initialState: PostState = {
    posts: []
  }
  const [postsState, postsDispatch] = useReducer(postReducer, initialState)
  const { accessToken } = useAuth()
  const axios = useAxiosPrivate()

  // Provide user, login, and logout values to the context
  const contextValues: PostContextType = {
    postsState,
    postsDispatch
  }

  return <PostContext.Provider value={contextValues}>{children}</PostContext.Provider>
}
