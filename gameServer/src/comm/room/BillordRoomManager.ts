import { BillordGameRoom } from "./BillordGameRoom";

export default class BillordGameRoomManager {
    private roomId: number = 0
    private getRoomid() {
        return ++this.roomId
    }
    private billordHashMap: { [key: number]: BillordGameRoom } = {}

    getRoom(id: number) {
        let item = this.billordHashMap[id]
        if(!item){
            this.billordHashMap[id] =     item = new BillordGameRoom(id)
        }
        return item
     }
    joinRoom() {
        let roomList = Object.keys(this.billordHashMap)
        if (roomList.length) {
            let itemIndex = roomList[Math.floor(Math.random() * roomList.length)]
            return this.billordHashMap[Number(itemIndex)]
        }
        let roomId = this.getRoomid()
        let item = new BillordGameRoom(roomId)
        this.billordHashMap[roomId] = item
        return item
    }

    joinRoomForId(id:number) {
        let item = this.billordHashMap[id]
        if(!item){
            this.billordHashMap[id] =     item = new BillordGameRoom(id)
        }
     }
    createRoom() { }

    cleanAllRoom() {
    }
}