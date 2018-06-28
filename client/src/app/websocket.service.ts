import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Message } from './model/message';
import { Event } from './model/event';

import * as socketIo from 'socket.io-client';
import { PriceTable } from './model/price-table';

const SERVER_URL = 'http://localhost:8080';

@Injectable()
export class WebSocketService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message>(observer => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }
  public onReBoundData(): Observable<PriceTable[]> {
    return new Observable<PriceTable[]>(observer => {
      this.socket.on('reBoundData', (data: PriceTable[]) => observer.next(data));
    });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
      this.socket.on(event, () => observer.next());
    });
  }
}