import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stage } from '../models/stage';
import { Observable, BehaviorSubject } from 'rxjs';
import { GameStateUtils } from '../utils/game-state-util';
import { LocationNFC, LOCATION_NFCS } from '../config/location-nfc';
import { NFC } from '../models/nfc';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  public stages: Stage[] = [];

  public $currentStage: BehaviorSubject<Stage> = new BehaviorSubject(null);
  private currentStage: Stage;

  public $completedChats: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private completedChats: string[];

  public $completedAudios: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private completedAudios: string[];

  public $availableChats: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private availableChats: string[];

  public $availableAudios: BehaviorSubject<string[]> = new BehaviorSubject(null);
  private availableAudios: string[];

  private readonly jsonUrl = 'assets/config.json';

  constructor(private http: HttpClient) {

  }

  public getStages(): Observable<Stage[]> {
    return this.http.get(this.jsonUrl) as Observable<Stage[]>;
  }

  public setCurrentStage(level: number) {
    this.currentStage = this.stages.find(stage => stage.level === level);
    this.$currentStage.next(this.currentStage);
    if (this.currentStage == null) {
      return;
    }

    const availableItems = this.currentStage.level_setup.enable_items;
    const availableAudios = availableItems.filter(availableItem => availableItem[0] === 'a');
    const availableChats = availableItems.filter(availableItem => availableItem[0] === 'C');
    this.setAvailableAudios(availableAudios);
    this.setAvailableChats(availableChats);
  }

  public getCurrentStage(): Observable<Stage> {
    return this.$currentStage;
  }

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
   * Completed chats methods.
   */
  public addCompletedChat(chatId: string): void {
    const chatIdInCompletedChats = this.completedChats.find(completedChat => completedChat === chatId);
    if (chatIdInCompletedChats != null) {
      return;
    }
    this.completedChats.push(chatId);

    this.$completedChats.next(this.completedChats);
  }

  /**
   * Completed audios methods.
   */
  public addCompletedAudio(audioId: string): void {
    const audioIdInCompletedAudios = this.completedAudios.find(completedAudio => completedAudio === audioId);
    if (audioIdInCompletedAudios != null) {
      return;
    }
    this.completedAudios.push(audioId);

    this.$completedAudios.next(this.completedAudios);
  }

  /**
   * Available chats methods.
   */
  public removeAvailableChats(chatId: string): void {
    const foundIndex = this.availableChats.findIndex(availableChat => availableChat === chatId);
    if (foundIndex < 0) {
      return;
    }
    this.availableChats.splice(foundIndex, 1);
    this.$availableChats.next(this.availableChats);
  }

  public addAvailableChats(chatIds: string[]): void {
    this.availableChats.push(...chatIds);
    this.$availableChats.next(this.availableChats);
  }

  public setAvailableChats(chatIds: string[]): void {
    this.availableChats = chatIds;
    this.$availableChats.next(this.availableChats);
  }

  /**
   * Available audios methods.
   */
  public removeAvailableAudios(chatId: string): void {
    const foundIndex = this.availableAudios.findIndex(availableAudio => availableAudio === chatId);
    if (foundIndex < 0) {
      return;
    }
    this.availableAudios.splice(foundIndex, 1);
    this.$availableAudios.next(this.availableAudios);
  }

  public addAvailableAudios(chatIds: string[]): void {
    this.availableAudios.push(...chatIds);
    this.$availableAudios.next(this.availableAudios);
  }

  public setAvailableAudios(chatIds: string[]): void {
    this.availableAudios = chatIds;
    this.$availableAudios.next(this.availableAudios);
  }

  public evaluateStageCleared(): boolean {
    let stageCleared = true;
    const clearedItems = this.completedAudios.concat(this.completedChats);
    const mandatoryItems = this.currentStage.level_setup.manadatory_items;

    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < mandatoryItems.length; index++) {
      const mandatoryItemIndexInClearedItem = clearedItems.findIndex(clearedItem => clearedItem === mandatoryItems[index]);
      if (mandatoryItemIndexInClearedItem < 0) {
        stageCleared = false;
        break;
      }
    }
    return stageCleared;
  }
}
