import { ball2d } from "./ball2d";
import { ball2dManager } from "./ball2dManager";
import { ball3d } from "./ball3d";
import { ball3dManager } from "./ball3dManager";

const { regClass, property } = Laya;
export interface ballGroup{
    ball2d:ball2d
    ball3d:ball3d
}
@regClass()
export class ballManager extends Laya.Script {
    //declare owner : Laya.Sprite3D;
    ball3dManager:ball3dManager
    ball2dManager:ball2dManager
    ballKv:{[key:number]:ballGroup} = {}
    initBallManager(){
        this.ball3dManager = this.owner.getComponent(ball3dManager)
        this.ball2dManager = this.owner.getComponent(ball2dManager)
    }
    /**
     * @param {Laya.Vector2} pos 球的位置 
     * @param value 
     */
    insertBall(pos:Laya.Vector2,value:number,id:number){
       let ball3d = this.ball3dManager.insertValue(value)
        let ball2d = this.ball2dManager.insertValue(pos)
        // //@ts-ignore
        ball2d.setTexture(this.ball3dManager.ballTextueKv[value])
       this.ballKv[id] = {
        ball2d:ball2d,
        ball3d:ball3d
       }
    }
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
    //onEnable(): void {}

    /**
     * 组件被禁用时执行，例如从节点从舞台移除后
     */
    //onDisable(): void {}

    /**
     * 第一次执行update之前执行，只会执行一次
     */
    //onStart(): void {}

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