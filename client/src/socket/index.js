import io from "socket.io-client";

const options = {
    forceNew: true,  // Правильное имя параметра
    reconnectionAttempts: Infinity,  // Правильное имя параметра
    timeout: 10000,
    transports: ['websocket'],  // Правильное имя параметра (transports вместо transpotts)
};

const socket = io.connect('http://localhost:4200', options);

export default socket;
