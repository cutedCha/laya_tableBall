import  { Bodies, Engine, Render, Runner, World } from "matter-js";
import ballWorldConfig from "./ballWorldConfig";
import * as Matter from "matter-js";

export class billordWorldManager{
    private engine:Engine
    private runner:Runner
    public mainBall:Matter.Body
    public otherBallKv:{[key:number|string]:Matter.Body} = {} 
    public ballList:Matter.Body[] =[]
    /**
     * 
     * @param isRender nodejs服务器和cocos引擎不需要开启渲染
     */
    constructor(isRender:boolean =false){
        this.engine = this.createEngine()
        this.mainBall = this.createMainBall()
        this.createBall()
        this.createWall()
        this.runner =  Runner.create();
        isRender && this.createRender()

    }
    /**
     * 物理世界启动
     * @param num 
     */
    runTick(num:number){
        Matter.Runner.tick(this.runner, this.engine,num);
    }

    private createRender(){
        let width = ballWorldConfig.deskSize.width
        let height = ballWorldConfig.deskSize.height
        var render = Render.create({
            element: document.body,
            engine: this.engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
            },
        });
        Render.run(render);
        return render
    }
    private createEngine(){
        let engine = Engine.create({
            gravity: { x: 0, y: 0 }, // 关闭重力效果
        });
        return engine
    }

 createMainBall() {
    var restitution  =ballWorldConfig.restitution
        // 创建母球
        var cueBall = Bodies.circle(ballWorldConfig.mainBallPosition.x, ballWorldConfig.mainBallPosition.y, ballWorldConfig.ballRadius, {
            restitution: restitution, // 调整回弹系数以控制球的弹跳
        });
        World.add(this.engine.world, cueBall);
        this.ballList.push(cueBall)
        return cueBall;
    }
     createBall() {
        let engine  = this.engine
        let ballRadius = ballWorldConfig.ballRadius
        // 创建被打击的球
        var objectBalls: Matter.Body[] = [];
        var numRows =ballWorldConfig.numRows;
        var startX = ballWorldConfig.startBallPos.x;
        var startY = ballWorldConfig.startBallPos.y;
        var restitution  =ballWorldConfig.restitution
    
        for (var row = 0; row < numRows; row++) {
            var ballsInRow = row + 1;
            var rowStartX = startX;
            var rowStartY = startY - row * ballRadius;
            for (var i = 0; i < ballsInRow; i++) {
                var x = rowStartX + (row - numRows / 2) * ballRadius * 2;
                var y = rowStartY + i * ballRadius * 2;
    
                var ball = Bodies.circle(x, y, ballRadius, {
                    restitution: restitution, // 调整回弹系数以控制球的弹跳
                });
    
                objectBalls.push(ball);
                this.ballList.push(ball)
                this.otherBallKv[ball.id] =ball
            }
        }
    
        // 将所有物体添加到世界中
        World.add(engine.world, [...objectBalls]);
    }
    createWall(){
        let wallBorder = ballWorldConfig.wallSize.wallBorder
        let width = ballWorldConfig.wallSize.width
        let height = ballWorldConfig.wallSize.height

        let worldWidth = ballWorldConfig.deskSize.width
        let worldheight = ballWorldConfig.deskSize.height
        let engine = this.engine
                // 创建一个静态矩形刚体
                var staticRect = Bodies.rectangle(0, -height/2+wallBorder, width, height, {
                    isStatic: true,
                    restitution: 1, // 调整回弹系数以控制球的弹跳
                });
                World.add(engine.world, staticRect);

                var staticRectBanner = Bodies.rectangle(0, worldheight+(height/2)-wallBorder, width, height, {
                    isStatic: true,
                    restitution: 1, // 调整回弹系数以控制球的弹跳
                });
                World.add(engine.world, staticRectBanner);

                var staticLeft = Bodies.rectangle(-width/2+wallBorder,0, width, height, {
                    isStatic: true,
                    restitution: 1, // 调整回弹系数以控制球的弹跳
                });
                World.add(engine.world, staticLeft);

                var staticRight = Bodies.rectangle(worldWidth+(width/2)-wallBorder,0, width, height, {
                    isStatic: true,
                    restitution: 1, // 调整回弹系数以控制球的弹跳
                });

                World.add(engine.world, staticRight);

    }

    public runTimeTick(){
        // 启动引擎
        setInterval(() => {
            Matter.Runner.tick(this.runner, this.engine, 1000 / 60);
        }, 1000 / 60);
                
    };
    /**
     * 打球
     * @param angle 
     */
    public hitBall(angle:number){
        let angleDir = this.getNormalizedVectorFromAngle(angle);
        let ball = this.mainBall;
        // 施加一个向右的力
        var forceMagnitude = 0.05;
        angleDir.x *= forceMagnitude;
        angleDir.y *= forceMagnitude;
        var force = { x: angleDir.x, y: angleDir.y };
        Matter.Body.applyForce(ball, ball.position, force);
    }

    getNormalizedVectorFromAngle(angle: number): { x: number; y: number } {
        const degree = angle % 360; // 将角度限制在 0 到 360 度之间
        const radian = (degree * Math.PI) / 180; // 将角度转换为弧度
        const x = Math.cos(radian);
        const y = Math.sin(radian);
        return { x, y };
    }
    /**
     * 在物理世界中施加力
     * @param normal 
     * @param hitEnergy 
     */
    hitNormal(normal:{x:number,y:number},hitEnergy:number =0.05){
        let force = normal
        normal.x *= hitEnergy;
        normal.y *= hitEnergy;
        let ball = this.mainBall;
        Matter.Body.applyForce(ball, ball.position, force);
    }
    
}