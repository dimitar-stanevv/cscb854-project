import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

@Component({
  selector: 'custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent {
  @Input() text: string;
  @Output() textChange = new EventEmitter<string>();

  @ViewChild('inputWrapper') inputWrapper: ElementRef<HTMLDivElement>;

  @Input() placeholder: string;

  updateText(newText: string) {
    this.textChange.emit(newText);
  }

  onFocus() {
    this.inputWrapper.nativeElement.classList.add('focused');
  }

  onBlur() {
    this.inputWrapper.nativeElement.classList.remove('focused');
  }
}
