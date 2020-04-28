import {
  Component, Input, OnChanges, Output, EventEmitter, AfterViewChecked,
  ChangeDetectionStrategy, ChangeDetectorRef, OnInit, OnDestroy
} from '@angular/core';
import { Chat } from 'src/app/models/chat';
import { ChatItem } from 'src/app/models/chat-item';
import { Audio } from 'src/app/models/audio';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';

export interface ChatItemDisplay {
  chatItem: ChatItem;
  option?: number;
}

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnChanges, AfterViewChecked, OnInit, OnDestroy {

  @Input() chat: Chat;
  @Output() chatCompleted = new EventEmitter();

  /**
   * Array to define which chat items should be displayed.
   */
  public chatItemsToDisplay: ChatItemDisplay[] = [];

  public chatFinished = false;

  // TODO timer of chat delay
  private readonly timeBetweenChatsDuration = 1500;

  // option buttons in chat disable
  public optionButtonVisible = false;

  /**
   * Variable to check wheter an audio message has been listen to.
   */
  public audioFinished = true;
  public audioLoaded = false;

  public menuServiceSubscription: Subscription;

  public currentUnfinishedChatItem: ChatItem;

  constructor(
    private menuService: MenuService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.menuServiceSubscription = this.menuService.$menuChanged.subscribe(menuOpen => {
      if (menuOpen) {
        this.optionButtonVisible = true;
      } else {
        this.optionButtonVisible = false;
      }
      this.setButtonClass();
    });
  }

  ngOnChanges(): void {
    if (this.chatItemsToDisplay.length <= 0) {
      // Add the first chat item.
      this.addNextChatItem(0);
      // TODO remove line below (only for development)
      // this.chatCompleted.emit();
    }
  }

  ngAfterViewChecked(): void {
    const chatRowElement = document.getElementById('chat-row');
    if (chatRowElement == null) {
      return;
    }
    chatRowElement.scrollTop = chatRowElement.scrollHeight;
  }

  ngOnDestroy(): void {
    this.menuServiceSubscription.unsubscribe();
  }

  /**
   * Method to check if the next chat item is of player type.
   * @param currentChatItem the current chat item to check the next chat item for.
   */
  public nextItemIsPlayerChatItem(currentChatItem: ChatItem): boolean {
    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem == null) {
      return false;
    }
    return nextChatItem.type === 'player';
  }

  /**
   * Method which triggers when a chat item title button is pressed.
   * @param title the title which was pressed.
   * @param chatItem  the chat item which involved player interaction.
   */
  public onClickTitleButton(title: string, chatItem: ChatItem): void {
    // TODO remove line below (only for development)
    // this.chatCompleted.emit();
    const indexOfClickedTitle = chatItem.titles.indexOf(title);
    if (indexOfClickedTitle < 0) {
      return;
    }
    // Create and draw the chat message for the clicked title.
    const chatItemDisplay = this.createChatItemDisplay(chatItem, indexOfClickedTitle);
    this.chatItemsToDisplay.push(chatItemDisplay);

    if (chatItem.next[0] === -1) {
      console.log('Chat finished title button');
      this.chatFinished = true;
      this.changeDetectorRef.detectChanges();
    }

    // Add the next chat item with a timeout.
    setTimeout(() => {
      this.addNextChatItem(chatItem.next[indexOfClickedTitle]);
    }, this.timeBetweenChatsDuration);
  }

  /**
   * Method to get the next chat item for a chat item.
   * @param currentChatItem the chat item to get the next chat item for.
   */
  public getNextChatItem(currentChatItem: ChatItem): ChatItem {
    const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
    if (nextChatItem == null) {
      return;
    }
    return nextChatItem;
  }

  /**
   * Method which triggers when the finish chat button is pressed.
   * Calls the output event.
   */
  public onClickFinishChat(): void {
    this.chatCompleted.emit(null);
  }

  /**
   * Method to create an audio object for an audio message in a chat.
   * @param audioId the id of the audio.
   */
  public createAudioObjectForAudioMessage(audioId: string): Audio {
    this.setAudioVariables();
    if (audioId == null) {
      return;
    }
    return { audio_id: audioId };
  }

  /**
   * Method which triggers when an audio completes.
   * @param audio the audio which completed.
   */
  public onAudioCompleted(audio: Audio): void {
    if (audio == null) {
      return;
    }
    this.audioFinished = true;

    // Logic for adding the next chat item after the audio finished.
    if (this.currentUnfinishedChatItem == null) {
      return;
    }
    this.addNextNonPlayerChatItem(this.currentUnfinishedChatItem);
    this.currentUnfinishedChatItem = null;
  }

  public getChatClassNameForChatItem(chatItem: ChatItem): string {
    return `chat-bubble-${chatItem.type}`;
  }

  private setButtonClass(): void {
    const buttonRows: HTMLDivElement[] = Array.from(document.getElementsByClassName('buttons-row')) as HTMLDivElement[];
    buttonRows.forEach(buttonRow => {
      if (this.optionButtonVisible) {
        buttonRow.style.left = '0';
      } else {
        buttonRow.style.left = '-400px';
      }
    });
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Method to set the audio booleans necessary for displaying the audio.
   * Disables the title buttons when the audio has not been completed.
   */
  private setAudioVariables(): void {
    if (!this.audioLoaded) {
      this.audioLoaded = true;
      this.audioFinished = false;
    }
  }

  /**
   * Method to add the next chat item to the chatItemsToDisplay array.
   * @param id the id of the currentChatItem.
   */
  private addNextChatItem(id: number): void {
    const currentChatItem = this.chat.chat_items.find(chatItem => chatItem.id === id);

    // If there is no currentChatItem chat is finished.
    if (currentChatItem == null || currentChatItem.next == null) {
      this.chatFinished = true;
      this.changeDetectorRef.detectChanges();
      console.log('Chat finished add next chat item');
      return;
    }

    // Do nothing if the next chat item is the last one.
    if (currentChatItem.next[0] === -1) {
      return;
    }

    this.chatItemsToDisplay.push(this.createChatItemDisplay(currentChatItem));
    // Detect changes and redraw array.
    this.changeDetectorRef.detectChanges();

    if (currentChatItem.audio_message != null && this.currentUnfinishedChatItem == null) {
      this.currentUnfinishedChatItem = currentChatItem;
      return;
    }

    // Add the next nonPlayerChatItem.
    this.addNextNonPlayerChatItem(currentChatItem);
  }

  private addNextNonPlayerChatItem(currentChatItem: ChatItem): void {
    setTimeout(() => {
      const nextChatItem = this.chat.chat_items.find(chatItem => chatItem.id === currentChatItem.next[0]);
      // Stop method if the nextChatItem is player, since it always requires user input.
      if (nextChatItem.type === 'player') {
        return;
      }
      this.chatItemsToDisplay.push(this.createChatItemDisplay(nextChatItem));
      // Detect changes and redraw array.
      this.changeDetectorRef.detectChanges();
      this.addNextNonPlayerChatItem(nextChatItem);
    }, this.timeBetweenChatsDuration);

  }

  /**
   * Method to create chatItemDisplay objects.
   * @param chatItemToDisplay the chat item to display.
   * @param option the option which was pressed.
   */
  private createChatItemDisplay(chatItemToDisplay: ChatItem, option?: number): ChatItemDisplay {
    const chatItemDisplay: ChatItemDisplay = {
      chatItem: chatItemToDisplay
    };
    // If the option is set use the option value to display the right message.
    if (option != null) {
      chatItemDisplay.option = option;
    }
    return chatItemDisplay;
  }

}
