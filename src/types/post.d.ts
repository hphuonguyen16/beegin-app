export interface Post {
  _id: string
  content: string
  images?: string[] 
  imageVideo?: string
  categories?: any
  hashtags?: string[]
  user: any
  numLikes: number
  numComments: number
  numShares?: number
  createdAt: string
}
