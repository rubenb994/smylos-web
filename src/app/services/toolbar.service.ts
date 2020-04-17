import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stage } from '../models/stage';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  public $finishedAmountChats: BehaviorSubject<number> = new BehaviorSubject(null);
  private finishedAmountChats = 0;

  public $finishedAmountAudios: BehaviorSubject<number> = new BehaviorSubject(null);
  private finishedAmountAudios = 0;

  constructor() { }

  public getFinishedChatsAmount(): BehaviorSubject<number> {
    return this.$finishedAmountAudios;
  }

  public setFinishedChatsAmount(amount): void {
    this.finishedAmountChats = amount;
    this.$finishedAmountChats.next(this.finishedAmountChats);
  }

  public getFinishedAudiosAmount(): BehaviorSubject<number> {
    return this.$finishedAmountAudios;
  }

  public setFinishedAudiosAmount(amount): void {
    this.finishedAmountAudios = amount;
    this.$finishedAmountAudios.next(this.finishedAmountAudios);
  }

  public calculateMaxAmountChatsAndAudios(currentStage: Stage): [number, number] {
    if (currentStage == null) {
      return;
    }

    let maxAmountAudios = 0;
    let maxAmountChats = 0;

    currentStage.nfc.forEach(nfcItem => {

      if (nfcItem.chat != null) {
        maxAmountChats++;
      }

      if (nfcItem.audios != null && nfcItem.audios.length > 0) {
        maxAmountAudios = maxAmountAudios + nfcItem.audios.length;
      }
    });
    return [maxAmountChats, maxAmountAudios];
  }


}

