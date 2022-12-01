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
  | 'grow-width'
  | 'blur';

@Directive({
  selector: '[scrollAnimation]'
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
   * At what point to make the element visible regarding the
   * current scroll position. Measured as the distance from top
   * of the element to the bottom of the window area (in pixels)
   * Note:
   * - the minimum sensible value to set is 0px, because
   *   that's the moment the element's upper edge is exactly at
   *   the bottom edge of the window area;
   * - a too large value will be ignored, as the maximum sensible
   *   value to set is constrained by the height of the window area
   *   minus 200px (in order to prevent a case where the animation
   *   would not be triggered due to scrolling the page too fast).
   */
  @Input() sensitivity: number = 100;

  /**
   * What animation to use (applied directly when referencing the directive)
   * Eg. <h1 scrollAnimation="fade-up">Some title</h1>
   * See ScrollAnimationType to see the possible values
   */
  @Input() scrollAnimation: ScrollAnimationType

  /**
   * Duration of the animation in milliseconds
   * Under the hood, this is the "transition-duration" CSS property
   * Default is 1000ms (it's provided in CSS)
   * Negative values are ignored and the default is used instead
   */
  @Input() duration = 1000;

  /**
   * Delay of the animation in milliseconds
   * Default is 0ms (no delay) - the animation will be applied
   * immediately after the element is deemed visible (see "sensitivity")
   * Negative values are ignored and the default is used instead
   */
  @Input() delay = 0;

  /**
   * Emit an event when animation starts (which corresponds to
   * the moment the "end" class is appended)
   */
  @Output() onAnimationStarted = new EventEmitter<void>();

  /**
   * Emit an event when animation is completed entirely
   */
  @Output() onAnimationCompleted = new EventEmitter<void>();

  /**
   * Y-coordinate of element (relative to page top)
   * Calculated on ngAfterViewInit lifecycle hook
   */
  elementPosition: number;

  /**
   * Status of animation - becomes "true" when "animationApplied" event
   * is emitted. Only set to true once, after which tracking stops
   */
  animationApplied = false;

  /**
   * Keep the "windowScrolled" function reference for performance
   * reasons
   */
  scrollFunctionRef: any;

  ngOnInit(): void {
    this.el.nativeElement.classList.add('custom-anim');
    this.el.nativeElement.classList.add(this.scrollAnimation);
    if (this.duration !== undefined && this.duration > 0) {
      this.el.nativeElement.style.transitionDuration = `${this.duration}ms`;
    }
  }

  ngAfterViewInit(): void {
    this.elementPosition = this.el.nativeElement.getBoundingClientRect().top + window.scrollY;
    this.windowScrolled(); // Perform an initial check for elements that are in the initial viewing area
    this.scrollFunctionRef = this.windowScrolled.bind(this);
    window.addEventListener('scroll', this.scrollFunctionRef);
  }

  windowScrolled(): void {
    if (!this.animationApplied) {
      const animationRegionReached = window.scrollY + (window.innerHeight - this.sensitivity) > this.elementPosition;
      const endOfBodyReached = document.body.scrollHeight <= window.scrollY + window.innerHeight + 100;
      // Note that in the case the top edge of the element reaches a
      // point within 200px of the window area's top edge, the animation
      // will be preliminarily applied, even if the set delay has not yet
      // passed (in order to show the animation even when scrolling through
      // the page too fast):
      const shouldPreliminarilyApplyAnimation = this.elementPosition - 200 < window.scrollY;
      if (animationRegionReached || endOfBodyReached) {
        // Sanitize delay (in case negative value was provided):
        if (this.delay < 0) {
          this.delay = 0;
        }
        const animationCallback = setTimeout(() => this.applyAnimation(), this.delay);
        if (shouldPreliminarilyApplyAnimation) {
          clearTimeout(animationCallback);
          this.applyAnimation();
        }
      }
    }
  }

  /**
   * Start the transition-based animation. Note that the
   * onAnimationApplied callback is called immediately after
   * starting the animation,
   */
  applyAnimation() {
    this.el.nativeElement.classList.add('state-end');
    this.animationApplied = true;
    window.removeEventListener('scroll', this.scrollFunctionRef);
    this.onAnimationStarted.emit();
    setTimeout(() => this.onAnimationCompleted.emit(), this.duration);
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.scrollFunctionRef);
  }
}
