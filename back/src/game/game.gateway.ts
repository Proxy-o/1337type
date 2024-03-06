import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { textArray } from './texts';
import { Server } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  private readonly logger = new Logger(GameGateway.name);
  // map of connected clients
  clients = new Map();

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Initialized');
  }

  async handleConnection(client: any, ...args: any[]) {
    args as any;
    console.log('trying to connect');
    let token = client.handshake.headers.cookie;

    if (!token) {
      this.logger.error('No token provided');
      client.disconnect();
      return;
    }
    token = token.split('=')[1];
    console.log(`Token: ${token}`);
    let payload;
    try {
      payload = this.authService.verify(token);
    } catch (e) {
      this.logger.error(e);
      client.disconnect();
      return;
    }
    const user = await this.authService.findUserByUsername(payload.login);

    !user && client.disconnect();
    this.clients.set(client.id, user);
    //TODO  emit text to play to the client
    this.io
      .to(client.id)
      .emit('text', textArray[Math.floor(Math.random() * 6)]);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Cliend id:${client.id} disconnected`);
  }
  private clientStates = new Map<
    string,
    {
      currentIndex: number;
      userInput: any[];
      startTime: Date;
      wpm: number;
      started: boolean;
    }
  >();

  @SubscribeMessage('key')
  handleMessage(client: any, data: any) {
    const clientId = client.id; // Assuming client has an id property
    const clientState = this.clientStates.get(clientId);

    const { currentIndex, userInput } = clientState;
    const key = data;
    const correctText = 'the is teh test that you need to play';

    if (key === 'Backspace') {
      if (currentIndex === 0) {
        return;
      }
      userInput.pop();
      clientState.currentIndex--;
      return;
    }
    if (key === correctText[currentIndex]) {
      clientState.userInput = [
        ...userInput,
        {
          letter: key,
          index: currentIndex,
          style: 'correct',
        },
      ];
    } else if (currentIndex < correctText.length - 1) {
      clientState.userInput = [
        ...userInput,
        {
          letter: key,
          index: currentIndex,
          style: 'incorrect',
        },
      ];
    }
    if (currentIndex >= correctText.length - 1) {
      return;
    }
    clientState.currentIndex++;
  }

  @SubscribeMessage('start')
  handleStartText(client: any, data: any) {
    console.log(data);
    const clientId = client.id; // Assuming client has an id property
    let clientState = this.clientStates.get(clientId);
    if (!clientState) {
      clientState = {
        currentIndex: 0,
        userInput: [],
        startTime: new Date(),
        started: false,
        wpm: 0,
      };
      this.clientStates.set(clientId, clientState);
    }
    clientState.currentIndex = 0;
    clientState.userInput = [];
    clientState.startTime = new Date();
    clientState.started = true;
    clientState.wpm = 0;

    const timer = Number(data[0]);
    setTimeout(() => {
      const correct = clientState.userInput.filter(
        (el) => el.style === 'correct',
      ).length;

      const wpm = correct / 5 / (timer / 1000 / 60);
      client.emit('stop', String(wpm));
      clientState.wpm = wpm;
      clientState.started = false;
      const user = this.clients.get(clientId);
      user.wpm = wpm;
      this.userService.addWpm({
        data: {
          value: wpm,
          date: new Date(),
          type: data[1],
          user: { connect: { id: user.id } },
        },
      });
    }, timer);
  }
}
