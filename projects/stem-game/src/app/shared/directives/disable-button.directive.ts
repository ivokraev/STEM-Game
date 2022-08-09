import {
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  Renderer2,
  RendererStyleFlags2,
} from '@angular/core';

@Directive({
  selector: '[stemGameDisableButtonStyle]',
})
export class DisableButtonStyleDirective implements OnDestroy {
  @Input() disable: boolean = true;
  private interval!: any;

  constructor(private button: ElementRef, private renderer: Renderer2) {
    this.setStyle();
    this.setDynamicStyle();
  }

  setDynamicStyle(): void {
    this.interval = setInterval(() => this.setStyle(), 100);
  }

  setStyle(): void {
    if (this.disable) {
      this.renderer.setStyle(
        this.button.nativeElement,
        'cursor',
        'not-allowed'
      );
      this.renderer.setStyle(
        this.button.nativeElement,
        'background-color',
        'rgb(143, 171, 255)'
      );
    } else {
      this.renderer.setStyle(
        this.button.nativeElement,
        'cursor',
        'pointer'
      );
      this.renderer.setStyle(
        this.button.nativeElement,
        'background-color',
        'rgb(30 64 175)'
      );
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
