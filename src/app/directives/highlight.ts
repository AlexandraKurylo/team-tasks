import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
selector: '[appHighlight]',
})
export class Highlight {
  @Input() appHighlight = '';
  @HostBinding('style.backgroundColor') backgroundColor: string | null = null;

  @HostListener('mouseenter')
  onMouseEnter() {
    this.backgroundColor = this.appHighlight || '#fff3b0';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.backgroundColor = null;
  }
}