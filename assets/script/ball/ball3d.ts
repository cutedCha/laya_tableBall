const { regClass, property } = Laya;
import RenderTexture = Laya.RenderTexture;
import RenderTargetFormat = Laya.RenderTargetFormat
@regClass()
export class ball3d extends Laya.Script {
    //declare owner : Laya.Sprite3D;

    @property(Laya.Camera)
    camera:Laya.Camera  = null
    @property([Laya.Texture2D])
    textureList:Laya.Texture2D[] = []
    @property(Laya.MeshRenderer)
    renderMesh:Laya.MeshRenderer = null

    outRenderTexture:Laya.RenderTexture = null

    @property(Laya.Node)
    ballNode:Laya.Node  =null
    @property(Laya.Texture2D)
    normalMap:Laya.Texture2D = null
    onStart(): void {
     }

    setValue(index:number){
        let material =  new  Laya.BlinnPhongMaterial
        material.renderMode = Laya.MaterialRenderMode.RENDERMODE_TRANSPARENT
        material.shininess =1
        let texture = this.textureList[index-1]

        material.albedoTexture= texture
        material.normalTexture= this.normalMap
        this.renderMesh.material = material
        let renderTexture= new RenderTexture(200, 200, RenderTargetFormat.R16G16B16A16, RenderTargetFormat.DEPTHSTENCIL_24_8, false, 1);
        renderTexture.filterMode = Laya.FilterMode.Bilinear
        this.camera.renderTarget =  renderTexture
        this.outRenderTexture  =  this.camera.renderTarget  
        this.randomRoute()
    }
    randomRoute(){
       let sp =  this.ballNode as Laya.Sprite3D
       sp.transform.rotationEuler = new Laya.Vector3(Math.random()*360,Math.random()*360,Math.random()*360)
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
    onUpdate(): void {

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