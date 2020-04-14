import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LogoComponent } from './components/logo/logo.component';
import { LocationItemsComponent } from './components/location-items/location-items.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ToolbarComponent,
    LogoComponent,
    LocationItemsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
