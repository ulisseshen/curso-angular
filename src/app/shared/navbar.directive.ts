import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appNavbar]'
})
export class NavbarDirective implements OnInit {
  @Input() appNavbar!: HTMLButtonElement;
  @HostBinding('class.collapse') collapsed = true;
  @HostListener('window:resize', ['$event']) windowResize(event: Event) {
    this.collapsed = true;
  }
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.appNavbar.addEventListener('click', (event: Event) => {
      this.collapsed = !this.collapsed;
    });
  }
}
