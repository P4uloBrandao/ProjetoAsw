import { Component, OnInit,OnChanges, SimpleChanges } from "@angular/core";
import { ActivatedRoute,Router } from "@angular/router";
import { WebSocketService } from "src/app/shared/WebSocket/web-socket.service";
import { HttpService } from "src/app/shared/httpService/http.service";
import { interval } from 'rxjs';
@Component({
  selector: "app-chat-room",
  templateUrl: "./chat-room.component.html",
  styleUrls: ["./chat-room.component.scss"],
})
export class ChatRoomComponent implements OnInit {
  public username: any;
  public email: any;
  public chatroom: any;
  public message: any;
  public messageArray: any = [];
  public isTyping = false;
  public localToken: any;
  currentUser: any;
  reload:any=false;

  constructor(
    private route: ActivatedRoute,
    private webSocketService: WebSocketService,
    private userService: HttpService,
    private router: Router
  ) {}

  ngOnInit() {
   


    this.localToken = JSON.parse(localStorage.getItem("currentUser")!).token;
    this.userService.getUserById(this.localToken).subscribe((res) => {
      this.currentUser = res.data;
      console.log(this.currentUser);
      this.route.queryParamMap.subscribe(params => {
        this.username = params.get("name");
        this.email = params.get("email");
        this.reload = params.get("reload");
        if (this.currentUser) {
          if (this.currentUser.email < this.email) {
            console.log(this.username);
            this.chatroom =this.currentUser.email + ',' + this.email;
          } else {
            this.chatroom = this.email + ',' + this.currentUser.email;
          }
          this.webSocketService.joinRoom({
            user: this.currentUser._id,
            room: this.chatroom,
          });
          interval(1000).subscribe(() => {
          this.userService
            .getChatRoomsChat(this.chatroom)
            .subscribe((messages) => {
  
              this.messageArray = messages;
            });
          });
        }
      });

  
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    'entreiiiiii'
    // Verifique se ocorreram alterações nos parâmetros da rota desejados
    if (changes['nome'] || changes['email']) {
      this.ngOnInit();
    }
  }

  sendMessage() {
    console.log(this.chatroom);
    this.webSocketService.sendMessage({
      room: this.chatroom,
      user: this.currentUser._id,
      message: this.message,
    });
    this.message = "";
    this.ngOnInit()

  }

  typing() {
    this.webSocketService.typing({
      room: this.chatroom,
      user: this.currentUser.username,
    });
  }



}
