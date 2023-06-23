import BillordGlobalConfig from "./BillordGlobalConfig";
import { BillboardEve } from "./utils/event/globalObserver";
import { wsManager } from "./utils/wsManager";

export class billboradGolbal{
    public static instance:billboradGolbal = null
    public static getInstance(){
        if(!this.instance){
            this.instance = new billboradGolbal
            this.instance.event = new BillboardEve()
            this.instance.ws = new wsManager(BillordGlobalConfig.ws)
                        //@ts-ignore
            window["billboradGolbal"] =this.instance

        }
        return this.instance
    }
    ws:wsManager = null
    event?:BillboardEve = null
    userData: {roomId?:string,userId?:string,userSeat?:string} = {}
}
