import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stage } from '../models/stage';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  constructor() { }

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
