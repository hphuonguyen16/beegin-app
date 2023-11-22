
import { io } from 'socket.io-client'
import { getMessages } from '@/api/message';

const socket = io(`${process.env.NEXT_APP_BEEGIN_DOMAIN}`);

const socketFunctions = {
    addUser: (userId: any) => {
        socket.emit('add-user', userId)
    },

    getOnlineUsers: (setOnlineUserIds: any) => {
        socket.on("get-users", (users: any) => {
            setOnlineUserIds(users)
        });
    },

    sendSeenStatus: (lastMessage: any, friendId: string, userId: any) => {
        if (lastMessage?.sender !== userId) {
            socket.emit("message-seen-status", {
                userId: userId,
                receiver: friendId,
                status: "",
            });
        }
    },

    fetchSeenStatus: (messages: any, setMessages: any) => {
        socket.on("message-seen", () => {
            messages[messages.length - 1].status = "seen";
            setMessages(messages);
        })
    },

    sendTyping: (userId: any, receiver: string) => {
        socket.emit("typing", {
            sender: userId,
            receiver: receiver,
        });
    },

    fetchTyping: (setTyping: any, sender: string) => {
        socket.on("get-typing", (data) => {
            if (sender === data.sender) {
                setTyping(true);
                // Clear the typing status after 2 seconds
                setTimeout(() => {
                    setTyping(false);
                }, 2000);
            }
        });
    },

    sendMessage: (data: any) => {
        socket.emit('send-msg', data);
    },

    receiveMessage: (setArrivalMessage: any, friendId: string, userId: any) => {
        socket.on("msg-receive", (msg: any) => {
            if (friendId === msg.sender) {
                setArrivalMessage({ fromSelf: false, type: msg.type, content: msg.content, reaction: "", createdAt: msg.createdAt });
                socket.emit("message-seen-status", {
                    userId: userId,
                    receiver: friendId,
                    status: "",
                });
            }
        });
    },

    sendReaction: (messageId: string, reaction: string, receiver: string) => {
        socket.emit("react", { messageId, reaction, receiver })
    },

    fetchReaction: (messages: any, setMessages: any) => {
        socket.on("reaction-receive", (data: any) => {
            messages.find((x: any) => x.id === data.messageId).reaction = data.reaction;
            setMessages(messages);
        })
    }
}

export default socketFunctions;