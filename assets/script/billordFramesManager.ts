import { ballManager } from "./ball/ballManager";
import { billordWorldManager } from "./billordWorldManager";

interface frame{}
/**
 * 帧管理类
 */
class  syncManagerBase<T> {
    protected frameTime:number = 10//一帧率代表的时长
    protected state:number = 0
    protected frames: T[];

    protected currentTime:number = 0//当前播放了多少时间
    protected currentFrame:number = 0;//当前播放了这女

    constructor() {
      this.state =0
      this.frames = [];
    }
    public addFrame(frame: T): void {
      this.frames.push(frame);
    }
    cleanFrames(){
        this.currentFrame = 0
        this.frames = []
    }

    public getState(): number{
      return this.state;
    }
    public setState(newState: number): void {
      this.state = newState;
    }
    public update(dt: number): void {
        if(this.state == 0)return
    }
  }

export class billordFramesSyncManager extends syncManagerBase<frame>{
    //一些控制器
    controller:{
        ballworld?: billordWorldManager 
        ballManager?: ballManager 
    } = {}
    constructor(){
        super()
        //@ts-ignore
    }
    public update(dt: number): void {
        if(this.state == 0)return   
        this.updateHandel(dt)
    }
    /**
     * 更新
     * @param dt 
     */
    public updateHandel(dt:number){
    
        this.currentTime+=dt
        let frame = Math.floor(this.currentTime)
        if(frame < this.frames.length){
            console.warn("当前播放到===>",this.currentTime,Math.floor(this.currentTime/this.frameTime))
        }else{
            console.warn("播放完成")
        }
    }
}