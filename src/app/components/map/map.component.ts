import { Component, OnInit, AfterViewInit, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']

})
export class MapComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Output() newLocationSelected = new EventEmitter<number>();

  public svgPanZoomMap: SvgPanZoom.Instance;
  public readonly svgZoomFactor = 0.2;
  private readonly minZoom = 1;
  private readonly maxZoom = 3;

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
      maxZoom: this.maxZoom,
      minZoom: this.minZoom,
      zoomScaleSensitivity: this.svgZoomFactor,
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

  ngAfterViewChecked(): void {

  }

  public onClickZoomIn(): void {
    const newZoom = this.svgPanZoomMap.getZoom() + this.svgZoomFactor;
    if (newZoom > this.maxZoom) {
      return;
    }
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
    this.newLocationSelected.emit(9);
  }

  public onClickExecutiveOffice(): void {
    this.deactiveAllLocations();
    this.executiveOfficeDot.style.opacity = '1';
    this.newLocationSelected.emit(6);
  }

  public onClickTaxOffice(): void {
    this.deactiveAllLocations();
    this.taxOfficeDot.style.opacity = '1';
    this.newLocationSelected.emit(4);
  }

  public onClickHillHouse(): void {
    this.deactiveAllLocations();
    this.hillHouseDot.style.opacity = '1';
    this.newLocationSelected.emit(12);
  }

  public onClickMarket(): void {
    this.deactiveAllLocations();
    this.marketDot.style.opacity = '1';
    this.newLocationSelected.emit(5);
  }

  public onClickEastDistrict(): void {
    this.deactiveAllLocations();
    this.eastDistrictDot.style.opacity = '1';
    this.newLocationSelected.emit(11);
  }

  public onClickWell(): void {
    this.deactiveAllLocations();
    this.wellDot.style.opacity = '1';
    this.newLocationSelected.emit(2);
  }

  public onClickWestDistrict(): void {
    this.deactiveAllLocations();
    this.westDistrictDot.style.opacity = '1';
    this.newLocationSelected.emit(8);
  }

  public onClickPalace(): void {
    this.deactiveAllLocations();
    this.palaceDot.style.opacity = '1';
    this.newLocationSelected.emit(7);
  }

  public onClickPark(): void {
    this.deactiveAllLocations();
    this.parkDot.style.opacity = '1';
    this.newLocationSelected.emit(10);
  }

  public onClickEpeosStore(): void {
    this.deactiveAllLocations();
    this.epeosStoreDot.style.opacity = '1';
    this.newLocationSelected.emit(1);
  }

  public onClickSlums(): void {
    this.deactiveAllLocations();
    this.slumsDot.style.opacity = '1';
    this.newLocationSelected.emit(3);
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
