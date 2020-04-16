import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatItem } from 'src/app/models/chat-item';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() chat: Chat;

  public chatItemsToDisplay: ChatItem[] = [];
  public chatIndex = 0;

  constructor() { }

  ngOnInit(): void {
    console.log('inited');
  }

  ngOnChanges(): void {
    console.log(this.chat);
  }

  ngAfterViewInit(): void {
    this.addNextChatItem(0);
  }

  public nextItemIsPlayerChatItem(currentChatItem: ChatItem): boolean {
    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem == null) {
      return false;
    }
    return nextChatItem.type === 'player';
  }

  public onClickTitleButton(title: string, chatItem: ChatItem): void {
    console.log(title);
    console.log(chatItem);
    const indexOfClickedTitle = chatItem.titles.indexOf(title);
    if (indexOfClickedTitle < 0) {
      console.log('Could not determine title index');
      return;
    }
    this.addNextChatItem(chatItem.next[indexOfClickedTitle]);
  }

  public getNextChatItem(currentChatItem: ChatItem): ChatItem {
    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem == null) {
      console.log('Could not fetch next chat item');
      return;
    }
    return nextChatItem;
  }

  private addNextChatItem(id: number): void {
    if (this.chatIndex >= this.chat.chat_items.length) {
      console.log('chat finished');
      return;
    }
    const currentChatItem = this.chat.chat_items.find(chatItem => chatItem.id === id);
    this.chatItemsToDisplay.push(currentChatItem);

    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem.type !== 'player') {
      // A narration type chat message never has multiple next since it follows a linear path.
      this.addNextChatItem(nextChatItem.next[0]);
    }
  }



}
