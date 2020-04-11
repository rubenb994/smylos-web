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

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const svgPanZoomOptions: SvgPanZoom.Options = {
      // maxZoom: 10,
      // minZoom: 0.5,
      zoomScaleSensitivity: 0.05,
      center: true
      
    }
    this.svgPanZoomMap = SvgPanZoom('#smylos-map', svgPanZoomOptions);
  }

  public onClickZoomIn(): void {
    const newZoom = this.svgPanZoomMap.getZoom() + this.svgZoomFactor;
    this.svgPanZoomMap.zoom(newZoom);
  }

  public onClickZoomOut(): void {
    const newZoom = this.svgPanZoomMap.getZoom() - this.svgZoomFactor;
    this.svgPanZoomMap.zoom(newZoom);
  }

  public onClickAmerica(): void {
console.log("NorthAmerica");
  }
  

 

  

}
