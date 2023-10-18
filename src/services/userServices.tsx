import axios from 'axios'
const getMe = () => {
  return axios.post(`${process.env.NEXT_APP_BEEGIN_DOMAIN}/api/v1/users/me`)
}
export default { getMe }
