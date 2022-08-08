import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway {
  // constructor() {}

  @WebSocketServer()
  server: any;

  // Room is the name of the room to join.
  @SubscribeMessage('join')
  onJoinRoom(client, data) {
    console.log(data);
    client.broadcast.to(data).emit('message', { joinedUser: 'test' });
    client.join(data);
  }

  @SubscribeMessage('message')
  onMessage(client, data) {
    client.broadcast.to(data.room).emit('message', data.message);
  }

  @SubscribeMessage('leave')
  onLeave(client, data) {
    client.leave(data.room);
  }
}
