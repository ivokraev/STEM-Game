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
  @Input() set stemGameDisableButtonStyle(data: {
    disabled: boolean;
    setColor?: boolean;
  }) {
    if (data.disabled) {
      this.button.nativeElement.disabled = true;
      this.renderer.setStyle(
        this.button.nativeElement,
        'cursor',
        'not-allowed'
      );
      if (data.setColor) {
        this.renderer.setStyle(
          this.button.nativeElement,
          'background-color',
          'rgb(143, 171, 255)'
        );
      }
    } else {
      this.button.nativeElement.disabled = false;

      this.renderer.setStyle(this.button.nativeElement, 'cursor', 'pointer');
      if (data.setColor) {
        this.renderer.setStyle(
          this.button.nativeElement,
          'background-color',
          'rgb(30 64 175)'
        );
      }
    }
  }

  constructor(private button: ElementRef, private renderer: Renderer2) {}
}
