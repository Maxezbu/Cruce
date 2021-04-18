import { io } from "socket.io-client";

const socket = io("http://localhost:8000");

console.log(window.location.origin);

export default socket;
