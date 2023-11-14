
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

    fetchSeenStatus: () => {
        socket.on("message-seen", () => {
            console.log("last message seen!")
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
        socket.on("msg-recieve", (msg: any) => {
            setArrivalMessage({ fromSelf: false, type: msg.type, content: msg.content, createdAt: msg.createdAt });
            socket.emit("message-seen-status", {
                userId: userId,
                receiver: friendId,
                status: "",
            });
        });
    }
}

export default socketFunctions;