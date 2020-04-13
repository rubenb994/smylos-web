import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']

})
export class MapComponent implements OnInit, AfterViewInit {

  public svgPanZoomMap: SvgPanZoom.Instance;
  public readonly svgZoomFactor = 0.2;
  private readonly minZoom = 1;

  public bigSmileOfficeDot;
  public executiveOfficeDot;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const svgPanZoomOptions: SvgPanZoom.Options = {
      maxZoom: 3.0,
      minZoom: 1,
      zoomScaleSensitivity: 0.05,
      center: true
    }
    this.svgPanZoomMap = SvgPanZoom('#smylos-map', svgPanZoomOptions);

    this.bigSmileOfficeDot = document.getElementById('bigSmileDot');
    this.executiveOfficeDot = document.getElementById('executiveOfficeDot');
  }

  public onClickZoomIn(): void {
    const newZoom = this.svgPanZoomMap.getZoom() + this.svgZoomFactor;
    this.svgPanZoomMap.zoom(newZoom);
  }

  public onClickZoomOut(): void {
    const newZoom = this.svgPanZoomMap.getZoom() - this.svgZoomFactor;
    if (newZoom < this.minZoom) {
      return;
    }
    this.svgPanZoomMap.zoom(newZoom);
  }

  public onClickBigSmileOffice(): void {
    this.deactiveAllLocations();
    this.bigSmileOfficeDot.style.opacity = '1';
  }

  public onClickExecutiveOffice(): void {
    this.deactiveAllLocations();
    this.executiveOfficeDot.style.opacity = '1';
  }

  public deactiveAllLocations(): void {
    this.bigSmileOfficeDot.style.opacity = '0';
    this.executiveOfficeDot.style.opacity = '0';
  }
}
