import { mainGameSceneBase } from "./mainGameScene.generated";

const { regClass, property } = Laya;
@regClass()
export class mainGameScene extends mainGameSceneBase{
    onOpened(param: {roomId:string,userId:string,userSeat:string}): void {
        this.roomIdLabel.text = `roomId :${param.roomId}`
        this.playerIdLabel.text = `playerId :${param.userId}`
        if(param.userSeat == "3"){
            this.playerSeatLabel.text = `playerSeat :观众`

        }else{
            this.playerSeatLabel.text = `playerSeat :${param.userSeat}`

        }
    }
}