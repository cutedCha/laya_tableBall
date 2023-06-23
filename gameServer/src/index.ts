import { createServer } from "http";
import { Server } from "socket.io";
import BillordGameRoomManager from "./comm/room/BillordRoomManager"
import { BillordUser } from "./comm/room/BillordUser";
console.warn("start")
const cors = require('cors');

const app = require('express')();

const server = require('http').Server(app);


let roomMgr =new BillordGameRoomManager()
const io = new Server(server, {
    cors: {
        origin: "*"
      }
});

io.on("connection", (socket) => {
    let query = socket.handshake.query
    let roomId  =query.roomId as string
    let userId  = query.userId as string
    let user =  BillordUser.newUserJoin(userId,socket);
   roomMgr.joinRoomForId(userId,roomId)
   .then((data:{roomId:number,seat:number})=>{
    user.sendMsg({
        msgId:"loginRoomRsp",
        msgData:{
            roomId:data.roomId,
            userId:userId,
            userSeat:data.seat
        }
    })
    console.warn("加入房间成功")
   })
   .catch(()=>{
    console.warn("j加入失败")
   })
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
    // ...

});

server.listen(3000,()=>{
    console.warn("gameStart with prot 3000")
});
