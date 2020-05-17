import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-final-choice',
  templateUrl: './final-choice.component.html',
  styleUrls: ['./final-choice.component.scss']
})
export class FinalChoiceComponent implements OnInit {

  @Output() choiceMade = new EventEmitter<number>(null);

  constructor() { }

  ngOnInit(): void {
  }

  public onClickChoice(selectedChoice: number): void {
    this.choiceMade.emit(selectedChoice);
  }

}
