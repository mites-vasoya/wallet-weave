import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({selector : "[appNavBtnHover]"})

export class NavBtnHoverDirective {
  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseover') onMouseOver() {
    this.elementRef.nativeElement.style.cssText = "background-color: #875943; border-radius: 5px; color: whitesmoke; box-shadow: 0px 0px 10px -4px rgb(100, 100, 100); transform: scale(0.93);";
  }

  @HostListener("mouseout") onMouseOut() {
    this.elementRef.nativeElement.style.cssText = "";
  }
}

