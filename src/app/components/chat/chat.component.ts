import { Component, OnInit, Input, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatItem } from 'src/app/models/chat-item';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() chat: Chat;
  @Output() chatCompleted = new EventEmitter();

  /**
   * Array to define which chat items should be displayed.
   */
  public chatItemsToDisplay: ChatItem[] = [];

  public chatFinished = false;

  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    if (this.chatItemsToDisplay.length <= 0) {
      this.addNextChatItem(0);
    }
  }

  ngAfterViewInit(): void {

  }

  public nextItemIsPlayerChatItem(currentChatItem: ChatItem): boolean {
    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem == null) {
      return false;
    }
    return nextChatItem.type === 'player';
  }

  public onClickTitleButton(title: string, chatItem: ChatItem): void {
    this.chatItemsToDisplay.push(chatItem);

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

  public onClickFinishChat(): void {
    this.chatCompleted.emit(null);
  }

  private addNextChatItem(id: number): void {
    const currentChatItem = this.chat.chat_items.find(chatItem => chatItem.id === id);

    if (currentChatItem == null || currentChatItem.next == null) {
      this.chatFinished = true;
      return;
    }

    this.chatItemsToDisplay.push(currentChatItem);

    let nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    while (nextChatItem.type !== 'player') {
      this.chatItemsToDisplay.push(nextChatItem);
      nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === nextChatItem.next[0]);
    }
  }

}
