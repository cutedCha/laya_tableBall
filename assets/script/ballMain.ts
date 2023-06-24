import { billboradGolbal } from "./BillordGlobal";
import { ball3dManager } from "./ball/ball3dManager";
import { ballManager } from "./ball/ballManager";
import { billordFramesSyncManager } from "./billordFramesManager";
import { billordWorldManager } from "./billordWorldManager";
import { billordCubeBarComm } from "./comm/billordCubeBarComm";



const { regClass, property } = Laya;

@regClass()
export class ballMain extends Laya.Script {

    @property(Laya.Node)
    touchNode: Laya.Node = null
    @property(billordCubeBarComm)
    billordCube: billordCubeBarComm = null

    ballworld: billordWorldManager = null
    constructor() {
        super();
    }
    ballManager: ballManager = null
    billordFrames:billordFramesSyncManager  = null
    onStart(): void {
        
        let ballword = this.ballworld = new billordWorldManager
        this.ballManager = this.owner.getComponent(ballManager)

        this.ballManager.initBallManager()

        this.billordFrames = new billordFramesSyncManager()
        this.billordFrames.controller.ballManager = this.ballManager
        this.billordFrames.controller.ballworld = this.ballworld

        
        this.listenEve()
        this.listenTouch()
  



        billboradGolbal.getInstance().ws.send("synceBallWorldReq",{})



    }
    mainBallId:number = 0
    listenEve() {
        billboradGolbal.getInstance().event.once("synceBallWorldRsp", (data: any) => {

            let ballData = data.ballData

            this.ballManager.insertBall(new Laya.Vector2(ballData.mainBall.position.x, ballData.mainBall.position.y), 1, ballData.mainBall.id)

            let otherBallList: any[] = ballData.otherBall
            this.mainBallId =  ballData.mainBall.id

            otherBallList.forEach((item) => {
                this.ballManager.insertBall(new Laya.Vector2(item.position.x, item.position.y), item.value, item.id)
            })
    
            billboradGolbal.getInstance().event.on("synceBallBarRsp", (data: any) => {
                if (data.userId != billboradGolbal.getInstance().userData.userId) {
                    this.selectAngle(data.synceData)
                }
            })
            billboradGolbal.getInstance().event.on("hitBallRsp", (data: any) => {
                if (data.userId != billboradGolbal.getInstance().userData.userId) {
                    this.hitHandel(data.synceData.hitNormal)
                }
            })
            billboradGolbal.getInstance().event.on("syncBallFrameRsp", (data: any) => {
                // if(data.userId != billboradGolbal.getInstance().userData.userId){
                let ballList: any[] = data.ball;
                ballList.forEach((item) => {
                    let ballItem = this.ballManager.ballKv[item.id]
                    let ball2d = ballItem.ball2d
                    let ball2dSp = ball2d.owner as Laya.Sprite

                    let localPos = new Laya.Vector2(ball2dSp.x - item.position.x, ball2dSp.y - item.position.y)
                    let len = Laya.Vector2.scalarLength(localPos)
                    let normal = localPos.clone()
                    Laya.Vector2.normalize(localPos, normal)

                    let ball3dNode = ballItem.ball3d.ballNode as Laya.Sprite3D
                    if (len) {
                        ball3dNode.transform.rotate(new Laya.Vector3(normal.y * (len / 160) * 360, 0, normal.x * (len / 160) * 360), false, false)
                        ball2dSp.pos(item.position.x, item.position.y)
                    }
                })
            })
            billboradGolbal.getInstance().event.on("hitRsp",(data:{frames:any[],userId:number|string})=>{
                data.frames.forEach(item=>{
                    this.billordFrames.addFrame(item)
                })

            })
        })


    }
    listenTouch() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.mouseStart)

    }
    mouseStart() {
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.mouseMove)
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.mouseEnd)
        this.selectAngle()
    }
    mouseMove() {
        this.selectAngle()
    }
    mouseEnd() {
        return new Promise(async (reslove: Function) => {
            let mapSp = this.ballManager.ball2dManager.scene2dNode as Laya.Sprite
            let mainBall = this.ballManager.ballKv[this.mainBallId].ball2d.owner as Laya.Sprite
            let mainPos = new Laya.Vector2(mainBall.x, mainBall.y)
            let pos = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY)
            let globalPos = mapSp.globalToLocal(new Laya.Point(pos.x, pos.y), true)
            let inMainLocalPos = new Laya.Vector2(globalPos.x - mainPos.x, globalPos.y - mainPos.y)
            let normal = new Laya.Vector2()

            Laya.Vector2.normalize(inMainLocalPos, normal)
            billboradGolbal.getInstance().ws.send("hitBall", {
                hitNormal: { x: normal.x, y: normal.y }
            })
            let billordCube = this.billordCube.owner as Laya.Sprite
            await this.billordCube.runAction()
            this.billordFrames.setState(1)
            // this.ballworld.hitNormal(normal)

            setTimeout(() => {
                billordCube.visible = false
                reslove(null)
            }, 200);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.mouseMove)
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.mouseEnd)
            return

        })


    }
  async  hitHandel(hitNormal:{x:number,y:number}){
        let mapSp = this.ballManager.ball2dManager.scene2dNode as Laya.Sprite
        let mainPos = new Laya.Vector2(this.ballworld.mainBall.position.x, this.ballworld.mainBall.position.y)
        let pos = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY)
        let globalPos = mapSp.globalToLocal(new Laya.Point(pos.x, pos.y), true)
        let inMainLocalPos = new Laya.Vector2(globalPos.x - mainPos.x, globalPos.y - mainPos.y)
        let normal = new Laya.Vector2(hitNormal.x,hitNormal.y)
        Laya.Vector2.normalize(inMainLocalPos, normal)
        let billordCube = this.billordCube.owner as Laya.Sprite
        await this.billordCube.runAction()
        setTimeout(() => {
            billordCube.visible = false

        }, 200);

    }

    routeAngle(pos:{x:number,y:number},angle:number){
        angle = Math.PI/180 * angle
        return {
            x:(Math.cos(angle)*pos.x)+(Math.sin(angle)*pos.y),
            y:(-Math.sin(angle)*pos.x)+(Math.cos(angle)*pos.y)
        }
    }

    selectAngle(syncData?: {
        rotation: number,
        normal: { x: number, y: number }
    } ) {
        let mapSp = this.ballManager.ball2dManager.scene2dNode as Laya.Sprite

        let billordCube = this.billordCube.owner as Laya.Sprite
        billordCube.visible = true
        billordCube.zOrder = this.ballManager.ball2dManager.scene2dNode.numChildren

        let ballNode = this.ballManager.ballKv[this.mainBallId].ball2d.owner as Laya.Sprite
        // console.warn(ballNode.owner.transform)
        // return

        let mainPos = new Laya.Vector2(  ballNode.x,   ballNode.y)
        let pos :Laya.Vector2  = new Laya.Vector2(Laya.stage.mouseX, Laya.stage.mouseY)
    
        let globalPos = mapSp.globalToLocal(new Laya.Point(pos.x, pos.y), true)
        let inMainLocalPos = new Laya.Vector2(globalPos.x - mainPos.x, globalPos.y - mainPos.y)
        let normal = new Laya.Vector2()
        Laya.Vector2.normalize(inMainLocalPos, normal)

        let cos = Laya.Vector2.dot(normal, new Laya.Vector2(1, 0))
        let angle = 0
        if (syncData == undefined) {
            angle = 180 / Math.PI * Math.acos(cos)
            angle += 90
            if (inMainLocalPos.y > 0) {
                billordCube.rotation = angle
            } else {
                billordCube.rotation = 180 - angle
            }
  
        } else {
            billordCube.rotation = syncData.rotation
            normal.x = syncData.normal.x
            normal.y = syncData.normal.y
        }
        billordCube.pos(mainPos.x + (normal.x * -10), mainPos.y + normal.y * -10)
    

        if (syncData == undefined) {
            /**同步球杆 */
            billboradGolbal.getInstance().ws.send("synceBallBar", {
                rotation:  billordCube.rotation ,
                normal:{x:normal.x,y:normal.y}
            })
        }


    }
    /**
     * 游戏的tick运行时
     * @param dt 
     */
    updateTick(dt: number) {
        
        this.ballworld.runTick(dt)
        this.ballworld.ballList.forEach(item => {
            let ballItem = this.ballManager.ballKv[item.id]
            let ball2d = ballItem.ball2d
            let ball2dSp = ball2d.owner as Laya.Sprite
            
            let localPos = new Laya.Vector2(ball2dSp.x-item.position.x,ball2dSp.y-item.position.y)
            let len = Laya.Vector2.scalarLength(localPos)
            let normal = localPos.clone()
            Laya.Vector2.normalize(localPos,normal )
            
            let ball3dNode = ballItem.ball3d.ballNode as Laya.Sprite3D
            if(len){
                ball3dNode.transform.rotate(new Laya.Vector3(normal.y*(len/160)*360,0,normal.x*(len/160)*360),false,false)
                ball2dSp.pos(item.position.x, item.position.y)
            }
          
        })

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
    onUpdate(): void {
        if(this.billordFrames){
            this.billordFrames.update(Laya.timer.delta)
        }
        return
        this.updateTick(Laya.timer.delta)
    }

    /**
     * 每帧更新时执行，在update之后执行，尽量不要在这里写大循环逻辑或者使用getComponent方法
     */
    //onLateUpdate(): void {}

    /**
     * 鼠标点击后执行。与交互相关的还有onMouseDown等十多个函数，具体请参阅文档。
     */
    //onMouseClick(): void {}
}