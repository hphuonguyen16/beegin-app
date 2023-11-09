import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/user'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import urlConfig from '@/config/urlConfig'
import { Post } from '@/types/post'

// Define a user type or interface

// Create the context
export interface PostContextType {
  posts: Post[]
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>
  postsUserLikes: Set<string>
  setPostsUserLikes: React.Dispatch<React.SetStateAction<Set<string>>>
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
  const [posts, setPosts] = useState<Post[]>([])
  const [postsUserLikes, setPostsUserLikes] = useState<Set<string>>(new Set<string>())
  const axios = useAxiosPrivate()
  //add the post which user like to the set
  function addPostUserLikes(postId: string) {
    setPostsUserLikes((prev) => new Set(prev.add(postId)))
  }
  //remove the post which user like from the set
  function removePostUserLikes(postId: string) {
    setPostsUserLikes((prev) => {
      const newSet = new Set(prev)
      newSet.delete(postId)
      return newSet
    })
  }
  function checkPostUserLikes(postId: string) {
    return postsUserLikes.has(postId)
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${urlConfig.posts.getPosts}?limit=10`)
        const posts = response.data.data.data
        setPosts(response.data.data.data)
      } catch (error) {}
    }
    fetchPosts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [1])

  useEffect(() => {
    const fetchLikes = async () => {
      for (const post of posts) {
        const response = await axios.get(urlConfig.posts.checkLikePost(post._id))
        if (response.data.data) {
          setPostsUserLikes((prev) => new Set(prev.add(post._id)))
        }
      }
    }
    fetchLikes()
  }, [posts])

  // Provide user, login, and logout values to the context
  const contextValues: PostContextType = {
    posts,
    setPosts,
    postsUserLikes,
    setPostsUserLikes
  }

  return <PostContext.Provider value={contextValues}>{children}</PostContext.Provider>
}
