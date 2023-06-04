(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };

  // assets/script/ball/ball2d.ts
  var { regClass, property } = Laya;
  var ball2d = class extends Laya.Script {
    constructor() {
      super();
      this.sp = null;
    }
    setTexture(textuer) {
      this.sp.texture = new Laya.Texture(textuer);
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
  };
  __decorateClass([
    property(Laya.Sprite)
  ], ball2d.prototype, "sp", 2);
  ball2d = __decorateClass([
    regClass("06c54030-60e3-451a-a14b-bfb8f72424fd")
  ], ball2d);

  // assets/script/ball/ball2dManager.ts
  var { regClass: regClass2, property: property2 } = Laya;
  var ball2dManager = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.scene2dNode = null;
      this.ball2d = null;
    }
    /**
     * 插入节点
     * @param index 
     * @param position 
     */
    insertValue(position) {
      let ball = this.ball2d.create();
      this.scene2dNode.addChild(ball);
      ball.pos(position.x, position.y);
      return ball.getComponent(ball2d);
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
  };
  __decorateClass([
    property2(Laya.Node)
  ], ball2dManager.prototype, "scene2dNode", 2);
  __decorateClass([
    property2(Laya.Prefab)
  ], ball2dManager.prototype, "ball2d", 2);
  ball2dManager = __decorateClass([
    regClass2("20bfe878-cd06-49ec-9d52-3521f2c224ff")
  ], ball2dManager);

  // assets/script/ball/ball3d.ts
  var { regClass: regClass3, property: property3 } = Laya;
  var RenderTexture = Laya.RenderTexture;
  var RenderTargetFormat = Laya.RenderTargetFormat;
  var ball3d = class extends Laya.Script {
    constructor() {
      super();
      this.camera = null;
      this.textureList = [];
      this.renderMesh = null;
      this.outRenderTexture = null;
    }
    onStart() {
    }
    setValue(index) {
      console.warn("setvalue===>", index);
      let material = new Laya.BlinnPhongMaterial();
      material.renderMode = Laya.MaterialRenderMode.RENDERMODE_TRANSPARENT;
      material.albedoTexture = this.textureList[index];
      this.renderMesh.material = material;
      this.camera.renderTarget = new RenderTexture(50 * 20, 50 * 20, RenderTargetFormat.R16G16B16A16, RenderTargetFormat.DEPTHSTENCIL_24_8, false, 4);
      this.outRenderTexture = this.camera.renderTarget;
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
  };
  __decorateClass([
    property3(Laya.Camera)
  ], ball3d.prototype, "camera", 2);
  __decorateClass([
    property3([Laya.Texture2D])
  ], ball3d.prototype, "textureList", 2);
  __decorateClass([
    property3(Laya.MeshRenderer)
  ], ball3d.prototype, "renderMesh", 2);
  ball3d = __decorateClass([
    regClass3("0943151a-e93b-408a-bcf2-7732e3e472dd")
  ], ball3d);

  // assets/script/ball/ball3dManager.ts
  var { regClass: regClass4, property: property4 } = Laya;
  var ball3dManager = class extends Laya.Script {
    constructor() {
      super();
      this.scene3d = null;
      this.ballPre = null;
      this._addedNum = 0;
      this.ballTextueKv = {};
      this.ballCommKv = {};
    }
    onStart() {
    }
    /** */
    insertValue(index) {
      let ball = this.ballPre.create();
      let ball3dComm = ball.getComponent(ball3d);
      ball3dComm.setValue(index);
      this.scene3d.addChild(ball);
      ball.transform.position = new Laya.Vector3(this._addedNum * 100, 0, 0);
      this._addedNum += 1;
      this.ballCommKv[index] = ball3dComm;
      this.ballTextueKv[index] = ball3dComm.outRenderTexture;
      return ball;
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
  };
  __decorateClass([
    property4(Laya.Node)
  ], ball3dManager.prototype, "scene3d", 2);
  __decorateClass([
    property4(Laya.Prefab)
  ], ball3dManager.prototype, "ballPre", 2);
  ball3dManager = __decorateClass([
    regClass4("a4d0dee3-5109-4390-913f-a05f8f3256df")
  ], ball3dManager);

  // assets/script/ball/ballManager.ts
  var { regClass: regClass5, property: property5 } = Laya;
  var ballManager = class extends Laya.Script {
    constructor() {
      super();
    }
    initBallManager() {
      this.ball3dManager = this.owner.getComponent(ball3dManager);
      this.ball2dManager = this.owner.getComponent(ball2dManager);
    }
    /**
     * @param {Laya.Vector2} pos 球的位置 
     * @param value 
     */
    insertBall(pos, value) {
      this.ball3dManager.insertValue(value);
      let ball2d2 = this.ball2dManager.insertValue(pos);
      ball2d2.setTexture(this.ball3dManager.ballTextueKv[value]);
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
  };
  ballManager = __decorateClass([
    regClass5("81f2ed27-4d13-433c-b35f-73d85b703cd2")
  ], ballManager);

  // assets/script/ballMain.ts
  var { regClass: regClass6, property: property6 } = Laya;
  var ballMain = class extends Laya.Script {
    constructor() {
      super();
      this.ballManager = null;
    }
    onStart() {
      this.ballManager = this.owner.getComponent(ballManager);
      this.ballManager.initBallManager();
      this.ballManager.insertBall(new Laya.Vector2(100, 100), 0);
      this.ballManager.insertBall(new Laya.Vector2(100, 200), 1);
      this.ballManager.insertBall(new Laya.Vector2(100, 300), 2);
      this.ballManager.insertBall(new Laya.Vector2(100, 400), 3);
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
  };
  ballMain = __decorateClass([
    regClass6("8e3b7db3-2492-4e8f-8b42-195285ed59b9")
  ], ballMain);
})();
