import { BillordGameRoom } from "./BillordGameRoom";
import { BillordUser } from "./BillordUser";

export default class BillordGameRoomManager {
    private roomIdAuto: number = 0
    private getRoomid() {
        return ++this.roomIdAuto
    }
    private billordHashMap: { [key: number|string]: BillordGameRoom } = {}

    getRoom(id: number) {
        let item = this.billordHashMap[id]
        if(!item){
            this.billordHashMap[id] =     item = new BillordGameRoom(id)
        }
        return item
     }


    joinRoomForId(userId: number | string, id: number | string) {
        return new Promise((reslove:Function,reject:Function)=>{
        let user = BillordUser.getUserForId(userId)
        if (!user) {
            reject()
            return
        }
        let item = this.billordHashMap[id]
        if (!item) {
            this.billordHashMap[id] = item = new BillordGameRoom(id)
        }
       let seat =  item.addPlayer(user)
        reslove({
            roomId:item.roomId,
            seat:seat
        })

        return
    })

    }
     /**
      * 
      * @param id 
      */
    createRoom(id:number) { 
       return new BillordGameRoom(id)
    }
    
    cleanAllRoom() {
    }
}