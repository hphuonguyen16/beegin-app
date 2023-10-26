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
    getMyFollowingList: `/api/v1/follows/getMyFollowingList`
  },
  otherUsers: {
    getProfileByID: `/api/v1/users/getProfileByID/:id`,
    getMyNumberOfFollows: `/api/v1/follows/getNumberOfFollows/:id`,
    getMyFollowerList: `/api/v1/follows/getAllFollowers/:id`,
    getMyFollowingList: `/api/v1/follows/getAllFollowings/:id`
  },
  posts: {
    getPosts: `/api/v1/posts`,
    getComments: (postId: string) => `/api/v1/posts/${postId}/comments`,
    getMyPosts: `/api/v1/posts/me`
  }
}

export default UrlConfig
