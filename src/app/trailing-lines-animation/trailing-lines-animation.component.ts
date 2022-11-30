import { Component } from "@angular/core";

@Component({
  selector: 'trailing-lines-animation',
  templateUrl: './trailing-lines-animation.component.html',
  styleUrls: ['./trailing-lines-animation.component.scss']
})
export class TrailingLinesAnimationComponent {
  createRange(to: number) {
    return new Array(to).fill(0).map((n, index) => index + 1);
  }
}
