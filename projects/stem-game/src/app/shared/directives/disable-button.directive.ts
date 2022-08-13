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
export class DisableButtonStyleDirective {
  @Input() set stemGameDisableButtonStyle(disabled: boolean) {
    if (disabled) {
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
      this.renderer.setStyle(this.button.nativeElement, 'cursor', 'pointer');
      this.renderer.setStyle(
        this.button.nativeElement,
        'background-color',
        'rgb(30 64 175)'
      );
    }
  }

  constructor(private button: ElementRef, private renderer: Renderer2) {}
}
