import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';

enum svgIcons {
  check = 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z',
  location = 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
  question = 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z',
}

@Component({
  selector: 'stem-game-game-menu-button',
  templateUrl: './game-menu-button.component.html',
  styleUrls: ['./game-menu-button.component.scss'],
})
export class GameMenuButtonComponent implements OnInit {
  readonly currentLevel: number = 2;

  @Input() questionId: number = 0;
  @ViewChild('svgIcon', { static: true }) svgIcon!: ElementRef;
  @ViewChild('svgIconPath', { static: true }) svgIconPath!: ElementRef;
  @ViewChild('questionCard', { static: true }) questionCard!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.questionId < this.currentLevel) {
      this.setWithRenderer('level-button-completed', 'svg-green', svgIcons.check);
    } else if (this.questionId === this.currentLevel) {
      this.setWithRenderer('level-button-current', 'svg-blue', svgIcons.location);
    } else {
      this.setWithRenderer('level-button-future', 'svg-white', svgIcons.question);

    }
  }

  private setWithRenderer(questionCardClass: string, svgIconClass: string, svgIconPath: string){
    this.renderer.addClass(this.questionCard.nativeElement, questionCardClass);
    this.renderer.addClass(this.svgIcon.nativeElement, svgIconClass);
    this.renderer.setAttribute(this.svgIconPath.nativeElement, 'd', svgIconPath);
  }

  disabled(): boolean {
    if(this.questionId > this.currentLevel) return true;
    return false;
  }
}
