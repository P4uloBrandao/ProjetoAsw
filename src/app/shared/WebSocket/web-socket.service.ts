import { Injectable } from '@angular/core';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  //private socket = io('http://13.39.18.106:8080');
  private socket = io('http://localhost:8080');
  constructor() { }

  joinRoom(data:any) {
    this.socket.emit('join', data);
  }

  sendMessage(data:any) {
    this.socket.emit('message', data);

    // Retorna um Observable vazio para indicar que a mensagem foi enviada
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String,timestamp: Date}>(observer => {
      this.socket.on('new message', (data:any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data:any) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data:any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
