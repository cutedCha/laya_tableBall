import { Socket, io } from "socket.io-client";
import { billboradGolbal } from "../BillordGlobal";

interface dataMsg{
    msgId:number | string
    msgData:any
}
export class wsManager {
    
    queryData:{} = {}
    hostUrl: string = ""
    socket: Socket= null
    constructor(host: string) { 
        this.hostUrl = host
    }
    setData(data:any){
        this.queryData = data
    }
    init() {
        
        let socket = this.socket = io(`ws://${this.hostUrl}`, {
            query: this.queryData
        })
        
        socket.on("connect", this.connect)
        socket.on("message",this.message)
        socket.on("disconnect", this.disconnect)
        socket.io.on("reconnect", this.reconnect);

    }
    message(data:dataMsg){
        billboradGolbal.getInstance().event.event(`${data.msgId}`,data.msgData)
    }
    _firstConnect:boolean = false
    connect() {
        if(this._firstConnect)return
        this._firstConnect = true
        billboradGolbal.getInstance().event.event("firstConnect")
     }
    disconnect() {
        billboradGolbal.getInstance().event.event("disConnect")
     }
    reconnect() { 
        billboradGolbal.getInstance().event.event("reconnect")

    }
    /**
     * 发送
     * @param msgId 
     * @param data 
     */
    send(msgId:number |string,data:any){
        let msg:dataMsg = {
            msgData:data,
            msgId:msgId
        }
        let socket = this.socket
        socket.emit("userMsg",msg)
    }
}