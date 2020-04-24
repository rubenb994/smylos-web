import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { LocationItemsComponent } from './components/location-items/location-items.component';
import { ChatComponent } from './components/chat/chat.component';
import { AudioButtonComponent } from './components/audio-button/audio-button.component';
import { HttpClientModule } from '@angular/common/http';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { PotionAlarmComponent } from './components/potion-alarm/potion-alarm.component';
import { MobileErrorComponent } from './components/mobile-error/mobile-error.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { FinishGameComponent } from './components/finish-game/finish-game.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ToolbarComponent,
    LogoComponent,
    LocationItemsComponent,
    ChatComponent,
    AudioButtonComponent,
    IntroductionComponent,
    PotionAlarmComponent,
    MobileErrorComponent,
    FinishGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
