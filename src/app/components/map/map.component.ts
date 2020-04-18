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

  public bigSmileOfficeDot: SVGImageElement;
  public executiveOfficeDot: SVGImageElement;
  public taxOfficeDot: SVGImageElement;
  public hillHouseDot: SVGImageElement;
  public marketDot: SVGImageElement;
  public eastDistrictDot: SVGImageElement;
  public wellDot: SVGImageElement;
  public westDistrictDot: SVGImageElement;
  public palaceDot: SVGImageElement;
  public parkDot: SVGImageElement;
  public epeosStoreDot: SVGImageElement;
  public slumsDot: SVGImageElement;
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
    this.bigSmileOfficeDot = document.getElementById('bigSmileDot') as unknown as SVGImageElement;
    this.executiveOfficeDot = document.getElementById('executiveOfficeDot') as unknown as SVGImageElement;
    this.taxOfficeDot = document.getElementById('taxOfficeDot') as unknown as SVGImageElement;
    this.hillHouseDot = document.getElementById('hillHouseDot') as unknown as SVGImageElement;
    this.marketDot = document.getElementById('marketDot') as unknown as SVGImageElement;
    this.eastDistrictDot = document.getElementById('eastDistrictDot') as unknown as SVGImageElement;
    this.wellDot = document.getElementById('wellDot') as unknown as SVGImageElement;
    this.westDistrictDot = document.getElementById('westDistrictDot') as unknown as SVGImageElement;
    this.palaceDot = document.getElementById('palaceDot') as unknown as SVGImageElement;
    this.parkDot = document.getElementById('parkDot') as unknown as SVGImageElement;
    this.epeosStoreDot = document.getElementById('epeosStoreDot') as unknown as SVGImageElement;
    this.slumsDot = document.getElementById('slumsDot') as unknown as SVGImageElement;
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
