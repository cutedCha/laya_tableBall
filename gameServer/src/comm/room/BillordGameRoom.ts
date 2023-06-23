import * as SocketIO from "socket.io"
import { BillordUser } from "./BillordUser";
import { dataMsg } from "../../public/publicCmdDefine";
import { billordWorldManager } from "../../ballWorld/billordWorldManager";
export class BillordGameRoom {
  player1: BillordUser | null;
  player2: BillordUser | null;

  gameState: any;
  roomId: number | string = 0
  
  ballWorld:billordWorldManager = null
  constructor(roomId: number | string) {
    this.roomId = roomId
    this.player1 = null;
    this.player2 = null;
    this.gameState = {};
    this.ballWorld = new billordWorldManager
  }

  addPlayer(player: BillordUser) {
    if (!this.player1) {
      this.player1 = player;
      this.playerListenEve(player)
      // this.player1.emit('message', 'Waiting for opponent...');
      console.warn("加入房间成功你是玩家1")
      return 1
    }else{
      if(this.player1.userData.userId  == player.userData.userId){
        console.warn("玩家1断线重连")
        this.player1.sendMsg({
          msgData:{},
          msgId:"playerReconnect"
        })
        return 1
      }
    }
    if (!this.player2) {
      this.player2 = player;
      this.playerListenEve(player)
      this.startGame();
      console.warn("加入房间成功你是玩家2")
      return 2
    }else{
      if(this.player2.userData.userId  == player.userData.userId){
        console.warn("玩家2断线重连")
        return 2
      }
    }
    console.warn("房间人满了你只能是观众了")
    return 3
  }
  
  generateFrames(){}
  startGame() {
    return
    // TODO: Implement game logic here
    setInterval(() => {
      let ballList:any[] = []
  
      this.ballWorld.ballList.forEach((item)=>{
        ballList.push({
          id:item.id,
          position:{x:item.position.x,y:item.position.y}
        })
      })
          this.ballWorld.runTick(10)    
          this.Broadcast({
            msgId:"syncBallFrameRsp",
            msgData:{
              // userId:userId,
              ball:ballList
            }
          })
      }, 10);
  }

  endGame() {
    // TODO: Clean up game room here
  }
  /**
   * 用户监听事件
   * @param user 
   */
  playerListenEve(user:BillordUser){
    user.on("synceBallBar",(data:any,userId:number)=>{
      this.Broadcast({
        msgId:"synceBallBarRsp",
        msgData:{
          userId:userId,
          synceData:data,
        }
      })
    })
    user.on("hitBall",(data:any,userId:number)=>{
      // console.warn("hitNormal===>",data.hitNormal)
      this.hitNoramWorld(data.hitNormal,userId)
      this.Broadcast({
        msgId:"hitBallRsp",
        msgData:{
          userId:userId,
          synceData:data
        }
      })
    })
    user.on("synceBallWorldReq",()=>{
      let world = this.ballWorld

      let mainBall = {
        id:world.mainBall.id,
        position:{
          x:world.mainBall.position.x,
          y:world.mainBall.position.y
        }
      }
      let otherBallWorld:{id:any,position:{x:number,y:number}}[] = []
      for(let i = 0;i<world.otherBallList.length;i++){
          let item =  world.otherBallList[i]
          if(!item)continue
          let dataItem = {
            id:item.id,
            position:{
              x:item.position.x,
              y:item.position.y
            },
            value:i+2
          }
          otherBallWorld.push(dataItem)
      }
      let ballData = {
        mainBall:mainBall,
        otherBall:otherBallWorld
      }

      user.sendMsg({
        msgId:"synceBallWorldRsp",
        msgData:{
          ballData:ballData,
        }
      })
    })
  }
  
  hitNoramWorld(normal:{x:number,y:number},userId:number){
    this.ballWorld.hitNormal(normal)    
  }

  Broadcast(data:dataMsg){
    let boradList:BillordUser[] = [this.player1,this.player2]
    boradList.forEach((item)=>{
      if(item){
        item.sendMsg(data)
      }
    })
  }
}