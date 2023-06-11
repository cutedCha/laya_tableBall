import { createServer } from "http";
import { Server } from "socket.io";
import BillordGameRoomManager from "./comm/room/BillordRoomManager"
import session from "express-session";
import http from 'http';
console.warn("start")
const cors = require('cors');

const app = require('express')();
cors
const server = require('http').Server(app);


let roomMgr =new BillordGameRoomManager()
const io = new Server(server, {
    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
    console.warn("加入一些")
    socket.on("login",()=>{
        console.warn("在先")
    })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    // ...
});

server.listen(3000,()=>{
    console.warn("gameStart with prot 3000")
});
