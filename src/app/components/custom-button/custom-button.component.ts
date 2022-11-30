import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from "@angular/core";

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent {
  @Output() onClick = new EventEmitter<void>();
  @ViewChild('button') button: ElementRef<HTMLButtonElement>;

  buttonDown() {
    if (this.button !== null) {
      this.button.nativeElement.classList.add('active');
    }
  }

  buttonUp() {
    setTimeout(() => {
      if (this.button !== null) {
        this.button.nativeElement.classList.remove('active');
      }
    }, 250);
    this.onClick.emit();
  }
}
