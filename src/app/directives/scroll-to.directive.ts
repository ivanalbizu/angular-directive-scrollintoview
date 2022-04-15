import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnDestroy,
    OnInit
  } from "@angular/core";
  
  @Directive({
    selector: "[appScrollTo]"
  })
  export class ScrollToDirective implements OnDestroy, OnInit, AfterViewInit {
    @Input() threshold = 1;
  
    private observer: IntersectionObserver | undefined;
  
    constructor(private elementRef: ElementRef) {}
  
    ngOnInit() {
      this.createObserver();
    }
  
    ngAfterViewInit() {
      this.startObservingElements();
    }
  
    ngOnDestroy() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = undefined;
      }
    }
  
    private createObserver() {
      const options = {
        rootMargin: "0px",
        threshold: this.threshold
      };
  
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view-port");
          } else {
            entry.target.classList.remove("in-view-port");
          }
        });
      }, options);
    }
  
    private startObservingElements() {
      if (!this.observer) {
        return;
      }
  
      const els = this.elementRef.nativeElement.querySelectorAll(
        ".main__container > div"
      );
      for (const el of els) {
        this.observer.observe(el);
      }
    }
  }
  