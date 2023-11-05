const UrlConfig = {
  user: {
    login: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/login`,
    signup: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/signup`,
    refresh: `/api/v1/users/refresh`
  },
  me: {
    getMe: `/api/v1/users/me`,
    getMyNumberOfFollows: `/api/v1/follows/getMyNumberOfFollows`,
    getMyFollowerList: `/api/v1/follows/getMyFollowerList`,
    getMyFollowingList: `/api/v1/follows/getMyFollowingList`,
    isFollowing: `/api/v1/follows/isFollowing/:id`,
    unfollow: `/api/v1/follows/unfollow/:id`,
    followingOtherUser: `/api/v1/follows/followingOtherUser`,
    suggestFollow: `/api/v1/follows/suggestFollow`

  },
  otherUsers: {
    getProfileByID: `/api/v1/users/getProfileByID/:id`,
    getMyNumberOfFollows: `/api/v1/follows/getNumberOfFollows/:id`,
    getMyFollowerList: `/api/v1/follows/getAllFollowers/:id`,
    getMyFollowingList: `/api/v1/follows/getAllFollowings/:id`
  },
  posts: {
    createPost: `/api/v1/posts`,
    getPosts: `/api/v1/posts`,
    getComments: (postId: string) => `/api/v1/posts/${postId}/comments`,
    getMyPosts: `/api/v1/posts/me`,
    likePost: (postId: string) => `/api/v1/posts/${postId}/like`,
    unlikePost: (postId: string) => `/api/v1/posts/${postId}/like`,
    checkLikePost: (postId: string) => `/api/v1/posts/${postId}/like`,
    getPostByUserId: (userId: string) => `/api/v1/posts/getPostByUserId/${userId}`
  },
  comments: {
    likeComment: (commentId: string) => `/api/v1/comments/${commentId}/like`,
    unlikeComment: (commentId: string) => `/api/v1/comments/${commentId}/like`
  },
  messages: {
    getFriends: `/api/v1/follows/get-friends`,
    getFriendMessages: `/api/v1/messages`,
    sendMessage: `/api/v1/messages`,
  }
}

export default UrlConfig
