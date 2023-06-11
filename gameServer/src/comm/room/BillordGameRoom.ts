import * as SocketIO  from "socket.io"
export class BillordGameRoom {
    player1: SocketIO.Socket | null;
    player2: SocketIO.Socket | null;
    gameState: any;
    roomId:number = 0

    constructor(roomId:number) {
      this.roomId = roomId
      this.player1 = null;
      this.player2 = null;
      this.gameState = {};
    }
   
    addPlayer(player: SocketIO.Socket) {
      if (!this.player1) {
        this.player1 = player;
        this.player1.emit('message', 'Waiting for opponent...');
      } else if (!this.player2) {
        this.player2 = player;
        this.player2.emit('message', 'Opponent found! Starting game...');
        this.player1.emit('message', 'Opponent found! Starting game...');
        this.startGame();
      } else {
        player.emit('message', 'Game room is full. Please try again later.');
      }
    }
   
    startGame() {
      // TODO: Implement game logic here
    }
   
    endGame() {
      // TODO: Clean up game room here
    }
  }