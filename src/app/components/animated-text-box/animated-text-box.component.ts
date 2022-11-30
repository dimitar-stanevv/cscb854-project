import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
  selector: 'animated-text-box',
  templateUrl: './animated-text-box.component.html',
  styleUrls: ['./animated-text-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedTextBoxComponent implements AfterViewInit {
  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Set a "global" delay on the animated words which will be
   * added to each of them (in milliseconds)
   */
  @Input() delay = 0;

  /**
   * How much to delay each individual animation after
   * the one before it (in milliseconds)
   */
  @Input() delayMultiplier = 20;

  /**
   * Set whether to animate each individual word or character
   */
  @Input() separator: 'word' | 'char' = 'word';

  @ViewChild('ngContentWrapper') contentWrapper: ElementRef<HTMLDivElement>;
  dividibles: string[]; // Either words or characters

  textReady = false;

  ngAfterViewInit() {
    // Set default delay multiplier (20ms for words and 3ms for characters):
    this.delayMultiplier = this.separator == 'word' ? 20 : 3;
    this.dividibles = this.contentWrapper.nativeElement.innerHTML
      .split(this.separator == 'word' ? ' ' : '');
    this.textReady = true;
    this.cdr.detectChanges();
  }
}
