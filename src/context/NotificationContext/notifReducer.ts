import { NotifAction, NotifState } from './types'

function AddContentNotification(notification: any) {
  switch (notification.type) {
    case 'follow':
      return {
        ...notification,
        content: 'started following you',
        actors: notification.actors.join(', ')
      }
    case 'like post':
      return {
        ...notification,
        content: `liked your post`,
        actors: notification.actors.join(', ')
      }
    case 'like comment':
      return {
        ...notification,
        content: `liked your comment`,
        actors: notification.actors.join(', ')
      }
    case 'comment':
      return {
        ...notification,
        content: `commented on your post "${notification.populate.content}"`,
        actors: notification.actors.join(', ')
      }
    case 'reply comment':
      return {
        ...notification,
        content: `replied to your comment "${notification.populate.content}"`,
        actors: notification.actors.join(', ')
      }
    default:
      return notification
  }
}

export const notifReducer = (state: NotifState, action: NotifAction) => {
  switch (action.type) {
    case 'SET_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.payload.notifications.map((notification) => AddContentNotification(notification)),
        total: action.payload.total
      }
    default:
      return state
  }
}
