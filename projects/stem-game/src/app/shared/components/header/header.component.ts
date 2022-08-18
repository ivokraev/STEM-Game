import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'stem-game-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    return;
  }

  onNavigate(namePage: string): void {
    switch (namePage) {
      case 'welcome':
        this.router.navigate(['home', 'welcome']);
        break;
      case 'game':
        this.router.navigate(['game']);
        break;
    }
  }
}
