export enum BilordCmdDefine{
    loginReq = "loginReq",
    joinRoomReq = "joinRoomReq",

    hitBallReq = "hitBallReq"
}

export interface dataMsg{
    msgId:number | string
    msgData:any
}
export interface userData {roomId?:string,userId?:string,userSeat?:string}