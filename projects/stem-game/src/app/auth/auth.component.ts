import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'stem-game-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  isLogin: boolean = true;
  

  constructor() { }

  ngOnInit(): void {
    return;
  }

}
