export class BillboardEve extends Laya.EventDispatcher{
    private static instance:BillboardEve = null;
    static  getInstance(){
        if(!this.instance){
            this.instance = new BillboardEve
        }
        return this.instance
    }
}
