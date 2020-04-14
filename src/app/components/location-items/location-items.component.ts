import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-location-items',
  templateUrl: './location-items.component.html',
  styleUrls: ['./location-items.component.scss']
})
export class LocationItemsComponent implements OnInit, AfterViewInit {

  public locationItem;
  public menuItem;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.locationItem = document.getElementById('chat');
    this.menuItem = document.getElementById('buttonMenu');
  }
  public onClickMenuOpen(): void {
    this.locationItem.style.left = '-400px';
    this.menuItem.style.left = '25px';
  }

  public onClickMenuClose(): void {
    this.locationItem.style.left = '0px';
    this.menuItem.style.left = '-400px';
  }

}
