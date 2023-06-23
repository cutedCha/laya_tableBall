import { billboradGolbal } from "./BillordGlobal";
import { wsManager } from "./utils/wsManager";

const { regClass, property } = Laya;

@regClass()
export class loginDialogss extends Laya.Script {

    @property(String)
    public text: string = "";
    @property(Laya.Button)
    sureBtn:Laya.Button = null
    @property(Laya.TextInput)
    roomIdInput:Laya.TextInput = null
    @property(Laya.TextInput)
    userIdInput:Laya.TextInput = null

    constructor() {
        super();
    }

    
    /**
     * 组件被激活后执行，此时所有节点和组件均已创建完毕，此方法只执行一次
     */
    //onAwake(): void {}

    /**
     * 组件被启用后执行，例如节点被添加到舞台后
     */
    onEnable(): void {}

    /**
     * 组件被禁用时执行，例如从节点从舞台移除后
     */
    onDisable(): void {}

    /**
     * 第一次执行update之前执行，只会执行一次
     */
    onStart(): void {
        let eve =  billboradGolbal.getInstance().event
        billboradGolbal.getInstance()
        this.sureBtn.clickHandler = new Laya.Handler(this, this.clickBtn)

        eve.once("loginRoomRsp",(data:any)=>{
            let scene = Laya.loader.getRes("mainGame.ls") as Laya.Scene
            if (!scene) {
                Laya.Scene.load("mainGame.ls", new Laya.Handler(this, (scene: Laya.Scene) => {
                    console.warn("loaded", scene)
                    billboradGolbal.getInstance().userData = data
                    scene.open(true,data)
                }))
            }else{
                scene.open(true,data)
            }
        })

    }
    joined:boolean = false
    clickBtn(){
        if(this.joined)return
        this.joined = true
        let roomId = this.roomIdInput.text
        let userId = this.userIdInput.text
        billboradGolbal.getInstance().ws.setData({
            roomId:Number(roomId),
            userId:Number(userId)
        })
        billboradGolbal.getInstance().ws.init()
        
    }
    /**
     * 手动调用节点销毁时执行
     */
    //onDestroy(): void {

    /**
     * 每帧更新时执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
     */
    //onUpdate(): void {}

    /**
     * 每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
     */
    //onLateUpdate(): void {}

    /**
     * 鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
     */
    //onMouseClick(): void {}
}