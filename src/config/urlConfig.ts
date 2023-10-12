const UrlConfig = {
  user: {
    login: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/login`,
    signup: `${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/signup`,
    refresh: `/api/v1/users/refresh`
  },
  me: {
    getMe: `/api/v1/users/me`
  }
}

export default UrlConfig
