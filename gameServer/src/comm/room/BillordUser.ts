import * as SocketIO  from "socket.io"
import { BillordUserObserve } from "../../BillordUserObserve"
import { dataMsg } from "../../public/publicCmdDefine"

export class BillordUser{
    observer:BillordUserObserve = null
    userData:{
        userId?:string  |number
    } = {}
    static BillordUserHashMap:{[key:string]:BillordUser}  = {}
    static newUserJoin(userId:number|string,socket:SocketIO.Socket ):BillordUser{
        let user = this.BillordUserHashMap[userId]
        if(user){
           user.socket.removeAllListeners()
           user.socket = socket
        }else{
            user = new BillordUser(socket)
            BillordUser.BillordUserHashMap[userId] = user
        }
        user.userData.userId = userId
        user.listenBase.bind(user)()
        return user
    }
    static getUserForId(userId:number|string):BillordUser|null{
        return this.BillordUserHashMap[userId]
    }

    constructor(socket:SocketIO.Socket ){
        this.socket = socket
        this.observer = new BillordUserObserve()
    }

    socket:SocketIO.Socket = null
    playerState:number = 0
    on(eve:string,callFun:any){
      this.observer.on(eve,callFun)
    }
    once(eve:string,call:any){
        this.observer.once(eve,call)
    }
    emit(eve:string|number,data:any){
        this.observer.emit(eve,data,this.userData.userId)
    }
    off(){}
    listenBase(){
        let socket = this.socket;
        socket.on("userMsg",(msg)=>{
            this.userMsg(msg)
        })
    }
    userMsg(message:dataMsg){
        this.emit(message.msgId,message.msgData)
    }
    sendMsg(rspMsg:dataMsg){
        let socket = this.socket;
        socket.send(rspMsg)
    }

}