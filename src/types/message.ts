export default interface Message {
    _id?: string
    fromSelf: boolean
    content: string
    createdAt?: Date
  }
  