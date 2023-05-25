import { Component } from "@angular/core";
import { Router,ActivatedRoute} from "@angular/router";
import { HttpService } from "src/app/shared/httpService/http.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent {
  public Users: any;
  private subscriptions: any[] = [];
  private localToken: any;
  public loggedUser: any;
  constructor(private httpService: HttpService, private router: Router,private route: ActivatedRoute) {
    this.localToken = JSON.parse(localStorage.getItem("currentUser")!).token;
   
  }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getUserById(this.localToken).subscribe((res) => {
        this.loggedUser = res;
        this.httpService.getUserChats(this.loggedUser.data._id).subscribe((res) => {
          this.Users = res;
        });
      })
    );
   
  }

  getUser() {
    return this.loggedUser.data.nome;
  }

  public goToChatRoom(user: any) {
    if (user.nome && user.email) {
      const queryParams = { name: user.nome, email: user.email, reload: true };
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      }).then(() => {
        this.router.navigate(['home/chat-room'], { queryParams: queryParams });
      });
    }
  }
  
}


