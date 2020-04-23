import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  @Output() introductionFinish = new EventEmitter<boolean>(false);

  constructor() { }

  ngOnInit(): void {
  }

  public onClickFinishIntroduction(): void {
    this.introductionFinish.emit(true);
  }

}
