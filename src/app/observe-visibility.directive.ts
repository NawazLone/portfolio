import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';

@Directive({
  selector: '[appObserveVisibility]',
  standalone: true
})
export class ObserveVisibilityDirective  implements OnInit{
  @Output() visible = new EventEmitter<boolean>();
  constructor(private element: ElementRef) { }
  ngOnInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.visible.emit(true);
          observer.unobserve(this.element.nativeElement); // Stop observing after first visibility
        }
      });
    }, { threshold: 0.2 }); // 20% visibility triggers animation

    observer.observe(this.element.nativeElement);
  }
}
