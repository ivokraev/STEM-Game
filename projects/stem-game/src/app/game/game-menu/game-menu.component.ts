import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stem-game-game-menu',
  templateUrl: './game-menu.component.html',
  styleUrls: ['./game-menu.component.scss']
})
export class GameMenuComponent implements OnInit {

  numbers: number[] = [1,2,3];
  constructor() { }

  ngOnInit(): void {
    return;
  }

}
