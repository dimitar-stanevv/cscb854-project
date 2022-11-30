import { AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output } from '@angular/core';

/**
 * @description Describe all possible animations used for the scroll
 * animation directive
 */
 export type ScrollAnimationType =
    'fade-in'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'fade-right-large'
  | 'grow'
  | 'grow-small'
  | 'grow-height'
  | 'grow-height-extended'
  | 'grow-width';

@Directive({
  selector: '[customScrollAnimation]'
})
/**
 * @description Apply a transition animation for the element
 * when it appears easily via an Angular directive
 * @author Dimitar Stanev
 */
export class ScrollAnimationDirective implements AfterViewInit, OnInit, OnDestroy {
  constructor(
    protected el: ElementRef<HTMLElement>
  ) { }

  /**
   * At what distance (measured from the top of the window area)
   * to make the element visible (default = height of the window area)
   */
  @Input() sensitivity: number; // In pixels

  /**
   * What animation to use (applied directly when referencing the directive)
   * Eg. <h1 customScrollAnimation="fade-up">Some title</h1>
   * See ScrollAnimationType to see the possible values
   */
  @Input() customScrollAnimation: ScrollAnimationType

  /**
   * Duration of the animation in milliseconds
   * Under the hood, this is the "transition-duration" CSS property
   * Default is 1000ms (it's provided in CSS)
   */
  @Input() duration: number;

  /**
   * Delay of the animation in milliseconds
   * Under the hood, this is the "transition-delay" CSS property
   * Default is 0ms (no delay)
   */
  @Input() delay: number;

  /**
   * Emit an event when scroll position reaches the sensitive area
   * (which corresponds to the moment the "end" class is appended,
   * but will not be the moment the animation starts if transition
   * delay is greater than zero)
   */
  @Output() animationApplied = new EventEmitter<void>();

  /**
   * Y-coordinate of element (relative to page top)
   * Calculated on ngAfterViewInit lifecycle hook
   */
  elementPosition: number;

  /**
   * Status of animation - becomes "true" when "animationApplied" event
   * is emitted
   */
  alreadyAnimated = false;

  /**
   * Keep the "windowScrolled" function reference for performance
   * reasons
   */
  scrollFunctionRef: any;

  ngOnInit(): void {
    this.el.nativeElement.classList.add('custom-anim');
    this.el.nativeElement.classList.add(this.customScrollAnimation);
    if (this.duration !== undefined && this.duration > 0) {
      this.el.nativeElement.style.transitionDuration = `${this.duration}ms`;
    }
    if (this.delay !== undefined && this.delay > 0) {
      this.el.nativeElement.style.transitionDelay = `${this.delay}ms`;
    }
    if (this.sensitivity === undefined) {
      this.sensitivity = window.innerHeight;
    }
  }

  ngAfterViewInit(): void {
    this.elementPosition = this.el.nativeElement.getBoundingClientRect().top + window.scrollY;
    this.windowScrolled(); // Perform an initial check for elements that are in the initial viewing area
    this.scrollFunctionRef = this.windowScrolled.bind(this);
    window.addEventListener('scroll', this.scrollFunctionRef);
  }

  windowScrolled(): void {
    if (!this.alreadyAnimated) {
      const animationRegionReached = window.scrollY + this.sensitivity > this.elementPosition;
      const endOfBodyReached = document.body.scrollHeight <= window.scrollY + window.innerHeight + 100;
      if (animationRegionReached || endOfBodyReached) {
        this.alreadyAnimated = true;
        this.el.nativeElement.classList.add('state-end');
        this.animationApplied.emit();
        window.removeEventListener('scroll', this.scrollFunctionRef);
      }
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollFunctionRef);
  }
}
