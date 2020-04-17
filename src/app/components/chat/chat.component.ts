import { Component, OnInit, Input, OnChanges, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatItem } from 'src/app/models/chat-item';
import { Audio } from 'src/app/models/audio';

export interface ChatItemDisplay {
  chatItem: ChatItem;
  option?: number;
}

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
  public chatItemsToDisplay: ChatItemDisplay[] = [];

  public chatFinished = false;

  /**
   * Variable to check wheter an audio message has been listen to.
   */
  public audioFinished = false;

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
    const indexOfClickedTitle = chatItem.titles.indexOf(title);
    if (indexOfClickedTitle < 0) {
      console.log('Could not determine title index');
      return;
    }
    const chatItemDisplay = this.createChatItemDisplay(chatItem, indexOfClickedTitle);
    this.chatItemsToDisplay.push(chatItemDisplay);

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

  public createAudioObjectForAudioMessage(audioId: string): Audio {
    if (!this.audioFinished) {
      this.audioFinished = false;
    }
    return { audio_id: audioId };
  }

  public onAudioCompleted(): void {
    this.audioFinished = true;
  }

  private addNextChatItem(id: number): void {
    const currentChatItem = this.chat.chat_items.find(chatItem => chatItem.id === id);

    // If there is no currentChatItem chat is finished.
    if (currentChatItem == null || currentChatItem.next == null) {
      this.chatFinished = true;
      return;
    }

    // Do nothing if the next chat item is the last one.
    if (currentChatItem.next[0] === -1) {
      return;
    }

    this.chatItemsToDisplay.push(this.createChatItemDisplay(currentChatItem));

    let nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);

    while (nextChatItem.type !== 'player') {
      this.chatItemsToDisplay.push(this.createChatItemDisplay(nextChatItem));
      nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === nextChatItem.next[0]);
    }

  }

  private createChatItemDisplay(chatItemToDisplay: ChatItem, option?: number): ChatItemDisplay {
    const chatItemDisplay: ChatItemDisplay = {
      chatItem: chatItemToDisplay
    };
    if (option != null) {
      chatItemDisplay.option = option;
    }
    return chatItemDisplay;
  }

}
