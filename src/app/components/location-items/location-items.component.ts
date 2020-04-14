import { Component, OnInit, AfterViewInit } from '@angular/core';


@Component({
  selector: 'app-location-items',
  templateUrl: './location-items.component.html',
  styleUrls: ['./location-items.component.scss']
})
export class LocationItemsComponent implements OnInit, AfterViewInit {

  public locationItem;

  constructor() { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    this.locationItem = document.getElementById('chat');
  }
  public onClickLocationItems(): void {
    console.log('Logging to the console');
    this.locationItem.style.right = '-300px';
  }

}
