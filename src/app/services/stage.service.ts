import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stage } from '../models/stage';
import { Observable, BehaviorSubject } from 'rxjs';
import { GameStateUtils } from '../utils/game-state-util';
import { LocationNFC, LOCATION_NFCS } from '../config/location-nfc';
import { NFC } from '../models/nfc';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  public stages: Stage[] = [];

  public $currentStage: BehaviorSubject<Stage> = new BehaviorSubject(null);
  private currentStage: Stage;

  private readonly jsonUrl = 'assets/config.json';

  constructor(private http: HttpClient) {

  }

  public getStages(): Observable<Stage[]> {
    return this.http.get(this.jsonUrl) as Observable<Stage[]>;
  }

  public setCurrentStage(level: number) {
    this.currentStage = this.stages.find(stage => stage.level === level);
    this.$currentStage.next(this.currentStage);
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
}
