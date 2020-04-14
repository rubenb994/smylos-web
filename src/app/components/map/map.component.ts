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
  public taxOfficeDot;
  public hillHouseDot;
  public marketDot;
  public eastDistrictDot;
  public wellDot;
  public westDistrictDot;
  public palaceDot;
  public parkDot;
  public epeosStoreDot;
  public slumsDot;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const svgPanZoomOptions: SvgPanZoom.Options = {
      maxZoom: 3.0,
      minZoom: 1,
      zoomScaleSensitivity: 0.05,
      center: true
    };

    this.svgPanZoomMap = SvgPanZoom('#smylos-map', svgPanZoomOptions);
    this.bigSmileOfficeDot = document.getElementById('bigSmileDot');
    this.executiveOfficeDot = document.getElementById('executiveOfficeDot');
    this.taxOfficeDot = document.getElementById('taxOfficeDot');
    this.hillHouseDot = document.getElementById('hillHouseDot');
    this.marketDot = document.getElementById('marketDot');
    this.eastDistrictDot = document.getElementById('eastDistrictDot');
    this.wellDot = document.getElementById('wellDot');
    this.westDistrictDot = document.getElementById('westDistrictDot');
    this.palaceDot = document.getElementById('palaceDot');
    this.parkDot = document.getElementById('parkDot');
    this.epeosStoreDot = document.getElementById('epeosStoreDot');
    this.slumsDot = document.getElementById('slumsDot');
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

  public onClickTaxOffice(): void {
    this.deactiveAllLocations();
    this.taxOfficeDot.style.opacity = '1';
  }

  public onClickHillHouse(): void {
    this.deactiveAllLocations();
    this.hillHouseDot.style.opacity = '1';
  }

  public onClickMarket(): void {
    this.deactiveAllLocations();
    this.marketDot.style.opacity = '1';
  }

  public onClickEastDistrict(): void {
    this.deactiveAllLocations();
    this.eastDistrictDot.style.opacity = '1';
  }

  public onClickWell(): void {
    this.deactiveAllLocations();
    this.wellDot.style.opacity = '1';
  }

  public onClickWestDistrict(): void {
    this.deactiveAllLocations();
    this.westDistrictDot.style.opacity = '1';
  }

  public onClickPalace(): void {
    this.deactiveAllLocations();
    this.palaceDot.style.opacity = '1';
  }

  public onClickPark(): void {
    this.deactiveAllLocations();
    this.parkDot.style.opacity = '1';
  }

  public onClickEpeosStore(): void {
    this.deactiveAllLocations();
    this.epeosStoreDot.style.opacity = '1';
  }

  public onClickSlums(): void {
    this.deactiveAllLocations();
    this.slumsDot.style.opacity = '1';
  }

  public deactiveAllLocations(): void {
    this.bigSmileOfficeDot.style.opacity = '0';
    this.executiveOfficeDot.style.opacity = '0';
    this.taxOfficeDot.style.opacity = '0';
    this.hillHouseDot.style.opacity = '0';
    this.marketDot.style.opacity = '0';
    this.eastDistrictDot.style.opacity = '0';
    this.wellDot.style.opacity = '0';
    this.westDistrictDot.style.opacity = '0';
    this.palaceDot.style.opacity = '0';
    this.parkDot.style.opacity = '0';
    this.epeosStoreDot.style.opacity = '0';
    this.slumsDot.style.opacity = '0';
  }

  public onMouseOverGroup(element: SVGElement): void {
    const image = element.firstChild as SVGImageElement;
    image.style.opacity = '1';
  }

  public onMouseOutGroup(element: SVGElement): void {
    const image = element.firstChild as SVGImageElement;
    image.style.opacity = '0';
  }
}
