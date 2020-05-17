import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.scss']
})
export class CreditsComponent implements OnInit {

  @Output() creditButtonClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  // close credits window
  public onClickCreditsClose(): void {
    this.creditButtonClicked.emit(false);
  }

}
