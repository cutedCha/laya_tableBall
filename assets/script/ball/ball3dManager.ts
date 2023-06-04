import { ball3d } from "./ball3d";

const { regClass, property } = Laya;

@regClass()
export class ball3dManager extends Laya.Script {
    @property(Laya.Node)
    scene3d:Laya.Node = null
    @property(Laya.Prefab)
    ballPre:Laya.Prefab = null
    _addedNum:number =0

    ballTextueKv:{[key:number]:Laya.RenderTexture} =  {}
    ballCommKv:{[key:number]:ball3d} = {}
    constructor() {

        super();
    }
    onStart(): void {
    
    }
    /** */
    insertValue(index:number){
        let ball = this.ballPre.create();
        let ball3dComm =  ball.getComponent(ball3d); 
        ball3dComm.setValue(index);
        this.scene3d.addChild(ball);
        (ball as Laya.Sprite3D).transform.position = new Laya.Vector3(this._addedNum*100,0,0)
       this._addedNum+=1
       this.ballCommKv[index] = ball3dComm
       this.ballTextueKv[index] =  ball3dComm.outRenderTexture
       
        return ball3dComm
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