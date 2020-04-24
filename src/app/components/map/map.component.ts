import { Component, OnInit, AfterViewInit, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import * as SvgPanZoom from 'svg-pan-zoom';
import { MenuService } from 'src/app/services/menu.service';
import { interval } from 'rxjs';

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

  public menuOpen: boolean;

  constructor(
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.menuService.$menuChanged.subscribe(menuOpen => {

      if (menuOpen == null) {
        return;
      }

      if (this.menuOpen == null) {
        this.menuOpen = menuOpen;
        this.panForMenuChange(menuOpen);
      }

      if (this.menuOpen != null && this.menuOpen !== menuOpen) {
        this.menuOpen = menuOpen;
        this.panForMenuChange(menuOpen);
      }
    });
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

    // TODO remove this development line
    // this.onClickEpeosStore();
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

  /**
   * Method to pan for a menu change.
   * @param menuOpen the desired pan value.
   */
  private panForMenuChange(menuOpen: boolean): void {
    const panAmount = 200;
    if (menuOpen) {
      this.smoothXPan(panAmount);
    } else {
      this.smoothXPan(panAmount * -1);
    }
  }

  /**
   * Method to smooth pan the svg zoom pan map to a new pan value.
   * @param panX the desired pan value.
   */
  private smoothXPan(panX: number): void {
    if (panX == null || panX === 0) {
      return;
    }

    const panAmountPerInterval = 5;
    const panInterval = 10;

    let changedX = 0;

    const source = interval(panInterval);
    const subscribtion = source.subscribe(val => {
      // Modify values.
      if (panX < 0) {
        changedX -= panAmountPerInterval;
      } else {
        changedX += panAmountPerInterval;
      }

      // Evaluate values.
      if ((panX < 0 && changedX <= panX) || (panX > 0 && changedX >= panX)) {
        subscribtion.unsubscribe();
      }
      // Pan new values.
      if (panX > 0) {
        this.svgPanZoomMap.panBy({ x: panAmountPerInterval, y: 0 });
      } else {
        this.svgPanZoomMap.panBy({ x: panAmountPerInterval * -1, y: 0 });
      }
    });
  }
}
