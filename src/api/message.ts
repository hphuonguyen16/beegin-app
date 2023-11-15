import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import UrlConfig from '@/config/urlConfig'

const axiosPrivate = useAxiosPrivate()

export const getMessages = async (id: string) => {
    try {
        let response = await axiosPrivate.get(`${UrlConfig.messages.getFriendMessages}/${id}`)
        return response.data.data
    } catch (err) { }
}