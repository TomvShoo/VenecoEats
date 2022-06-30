import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;

  messages: Observable<any[]>;
  newMsg = '';

  constructor(private chatService: ChatService, private router: Router) { }

  ngOnInit() {
    this.messages = this.chatService.getChatMessages();
  }

  sendMessage() {
    this.chatService.addMsg(this.newMsg).subscribe((res) => {
      console.log(res);
    })
  }

  signOut() {
    this.chatService.deleteCollection().then(() => {
      this.router.navigateByUrl('/', { replaceUrl: true });
    });
    localStorage.removeItem('currentUser')
  }

}