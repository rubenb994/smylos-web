import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stage } from '../models/stage';
import { Observable, BehaviorSubject } from 'rxjs';
import { LocationNFC, LOCATION_NFCS } from '../config/location-nfc';
import { NFC } from '../models/nfc';
import { Chat } from '../models/chat';
import { Audio } from '../models/audio';

import * as data from '../../assets/config.json';
import { GameStateUtils } from '../utils/game-state-util';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  public stages: Stage[] = (data as any).default;

  public $currentStage: BehaviorSubject<Stage> = new BehaviorSubject(null);
  private currentStage: Stage;

  public $completedChats: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private completedChats: string[] = [];

  public $completedAudios: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private completedAudios: string[] = [];

  public $availableChats: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private availableChats: string[] = [];

  public $availableAudios: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private availableAudios: string[] = [];

  public $stageFinished: BehaviorSubject<boolean> = new BehaviorSubject(null);

  constructor() {
    // this.stages = this.deepFreeze(this.stages);
  }

  // TODO test if method below is needed
  private deepFreeze(object): any {
    // Retrieve the property names defined on object
    const propNames = Object.getOwnPropertyNames(object);

    // Freeze properties before freezing self

    for (const name of propNames) {
      const value = object[name];

      if (value && typeof value === 'object') {
        this.deepFreeze(value);
      }
    }

    return Object.freeze(object);
  }

  public setCurrentStage(level: number) {
    // Set the finished stage to false.
    this.$stageFinished.next(false);

    // Clear completed items of previous stage.
    this.clearCompletedChatsAudios();

    // Find the currentStage.
    this.currentStage = this.stages.find(stage => stage.level === level);
    this.$currentStage.next(this.currentStage);
    if (this.currentStage == null) {
      return;
    }
    // Find availableItems, audios and chats.
    const availableItems = this.currentStage.level_setup.enable_items;
    const availableAudios = availableItems.filter(availableItem => availableItem[0] === 'a');
    const availableChats = availableItems.filter(availableItem => availableItem[0] === 'C');
    // Set them in the service.
    this.setAvailableAudios(availableAudios);
    this.setAvailableChats(availableChats);
  }

  /**
   * Method to get the NFC based on a locationId and the current stage.
   * @param locationId locationId to fetch the NFC for.
   */
  public getNFCForLocation(locationId: number): NFC {
    const currentStage = this.stages.find(stage => stage.level === GameStateUtils.getLevel());
    if (currentStage == null) {
      return null;
    }

    const locationNFCS: LocationNFC[] = LOCATION_NFCS;
    const foundLocationNFC: LocationNFC = locationNFCS.find(locationNFC => locationNFC.locationId === locationId);
    if (foundLocationNFC == null) {
      return null;
    }
    const nfcForLocation = currentStage.nfc.find(nfc => nfc.nfc_id === foundLocationNFC.nfcId);
    if (nfcForLocation == null) {
      return null;
    }
    return nfcForLocation;
  }

  /**
   * Method to clear the completd chats and audios arrays.
   */
  private clearCompletedChatsAudios(): void {
    this.completedAudios = [];
    this.$completedAudios.next(this.completedAudios);
    this.completedChats = [];
    this.$completedChats.next(this.completedChats);
  }

  /**
   * Method to add a completed chat to the completed chats array.
   * @param chatId the completed chat id.
   */
  private addCompletedChat(chatId: string): void {
    const chatIdInCompletedChats = this.completedChats.find(completedChat => completedChat === chatId);
    if (chatIdInCompletedChats != null) {
      return;
    }
    this.completedChats.push(chatId);

    this.$completedChats.next(this.completedChats);
  }

  /**
   * Method to add a completed audio to the complete audios array.
   * @param audioId the completed audio id.
   */
  private addCompletedAudio(audioId: string): void {
    const audioIdInCompletedAudios = this.completedAudios.find(completedAudio => completedAudio === audioId);
    if (audioIdInCompletedAudios != null) {
      return;
    }
    this.completedAudios.push(audioId);

    this.$completedAudios.next(this.completedAudios);
  }

  /**
   * Method to remove an available chat from the available items array when the chat completed.
   * Handles the adding and removal of enabled and disabled items.
   * Adds the removed chat to the completed items array.
   * Evaluates if the stage is cleared.
   * @param chat the chat to remove from available items.
   */
  public removeAvailableChat(chat: Chat): void {
    // Handling of available chats.
    const foundIndex = this.availableChats.findIndex(availableChat => availableChat === chat.chat_id);
    if (foundIndex < 0 || this.availableChats == null || this.availableChats.length <= 0) {
      return;
    }
    // TODO fix line below causing audio to dissapear
    this.availableChats.splice(foundIndex, 1);
    this.removeDisabledChatsFromAvailableChats(chat);
    this.addEnabledChatsToAvailableChats(chat);

    this.$availableChats.next(this.availableChats);
    this.$availableAudios.next(this.availableAudios);
    // Add removed chat to completed chats.
    this.addCompletedChat(chat.chat_id);
    // Evaluate if stage is cleared.
    this.evaluateStageCleared();
  }

  /**
   * Method to set the available chats.
   * @param chatIds chat ids to set as available.
   */
  private setAvailableChats(chatIds: string[]): void {
    this.availableChats = chatIds;
    this.$availableChats.next(this.availableChats);
  }

  /**
   * Method to add the enabled items of a chat to the available items array.
   * @param chat the chat to add the enabled items of.
   */
  private addEnabledChatsToAvailableChats(chat: Chat): void {
    if (chat.enable_items == null || chat.enable_items.length <= 0) {
      return;
    }

    for (let index = 0; index < chat.enable_items.length; index++) {
      const itemToEnable = chat.enable_items[index];
      if (itemToEnable[0] === 'a') {
        const foundAvailableItemIndex = this.availableAudios.findIndex(availableAudio => availableAudio === itemToEnable);
        // Dont add duplicates.
        if (foundAvailableItemIndex > 0) {
          return;
        }
        this.availableAudios.push(itemToEnable);
      } else {
        const foundAvailableItemIndex = this.availableChats.findIndex(availableChat => availableChat === itemToEnable);
        // Dont add duplicates.
        if (foundAvailableItemIndex > 0) {
          return;
        }
        this.availableChats.push(itemToEnable);
      }
    }
  }

  /**
   * Method to remove the disabled items of a chat from the available items array.
   * @param chat the chat to remove the disabled items for.
   */
  private removeDisabledChatsFromAvailableChats(chat: Chat): void {
    if (chat.disable_items == null || chat.disable_items.length <= 0) {
      return;
    }

    for (let index = 0; index < chat.disable_items.length; index++) {
      const itemToDisable = chat.disable_items[index];

      if (itemToDisable[0] === 'a') {
        const foundAvailableItemIndex = this.availableAudios.findIndex(avialableAudio => avialableAudio === itemToDisable);
        if (foundAvailableItemIndex < 0) {
          return;
        }
        this.availableAudios.splice(foundAvailableItemIndex, 1);
      } else {
        const foundAvailableItemIndex = this.availableChats.findIndex(availableChat => availableChat === itemToDisable);
        if (foundAvailableItemIndex < 0) {
          return;
        }
        this.availableChats.splice(foundAvailableItemIndex, 1);
      }
    }
  }

  /**
   * Method to remove an available audio from the available items array when the audio completed.
   * Handles the adding and removal of enabled and disabled items.
   * Adds the removed audio to the completed items array.
   * Evaluates if the stage is cleared.
   * @param audio the audio to remove from available items.
   */
  public removeAvailableAudio(audio: Audio): void {
    // Handling of available audios.
    const foundIndex = this.availableAudios.findIndex(availableAudio => availableAudio === audio.audio_id);
    if (foundIndex < 0) {
      return;
    }

    this.availableAudios.splice(foundIndex, 1);
    this.removeDisabledAudiosFromAvailableAudios(audio);

    this.$availableChats.next(this.availableChats);
    this.$availableAudios.next(this.availableAudios);
    // Add removed audio to complete audios.
    this.addCompletedAudio(audio.audio_id);
    // Evaluate if stage is cleared.
    this.evaluateStageCleared();
  }

  /**
   * Method to set the available audios.
   * @param chatIds the chats ids to set.
   */
  private setAvailableAudios(chatIds: string[]): void {
    this.availableAudios = chatIds;
    this.$availableAudios.next(this.availableAudios);
  }

  /**
   * Method to remove the disabled items of a audio from the available items array.
   * @param audio the audio to remove the disabled items for.
   */
  private removeDisabledAudiosFromAvailableAudios(audio: Audio): void {
    if (audio.disable_items == null || audio.disable_items.length <= 0) {
      return;
    }

    for (let index = 0; index < audio.disable_items.length; index++) {
      const itemToDisable = audio.disable_items[index];

      if (itemToDisable[0] === 'C') {
        const foundAvailableItemIndex = this.availableChats.findIndex(avialableChat => avialableChat === itemToDisable);
        if (foundAvailableItemIndex < 0) {
          return;
        }
        this.availableChats.splice(foundAvailableItemIndex, 1);
      } else {
        const foundAvailableItemIndex = this.availableAudios.findIndex(availableAudio => availableAudio === itemToDisable);
        if (foundAvailableItemIndex < 0) {
          return;
        }
        this.availableAudios.splice(foundAvailableItemIndex, 1);
      }
    }
  }

  /**
   * Method to evaluate if a stage has cleared.
   * In case its matches the contidon for a stage to be cleared, it updates the $stageFinished observable.
   */
  private evaluateStageCleared() {
    let stageCleared = true;
    const clearedItems = this.completedAudios.concat(this.completedChats);
    const mandatoryItems = this.currentStage.level_setup.mandatory_items;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < mandatoryItems.length; index++) {
      const mandatoryItemIndexInClearedItem = clearedItems.findIndex(clearedItem => clearedItem === mandatoryItems[index]);
      if (mandatoryItemIndexInClearedItem < 0) {
        stageCleared = false;
        break;
      }
    }

    this.$stageFinished.next(stageCleared);
  }
}
