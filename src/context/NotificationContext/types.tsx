import { Post } from '@/types/post'
import { Comment } from '@/types/comment'
import { Notification } from '@/types/notification'

interface AddNotifAction {
  type: 'ADD_POST'
  payload: Post
}

interface SetNotifsAction {
  type: 'SET_NOTIFICATIONS'
  payload: {
    notifications: Notification[]
    total: number
  }
}

export interface NotifState {
  notifications: Notification[]
  total: number
}

export type NotifAction = AddNotifAction | SetNotifsAction
