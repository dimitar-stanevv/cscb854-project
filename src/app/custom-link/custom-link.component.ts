import { Component, Input, ViewEncapsulation } from "@angular/core";
import { IconType } from "../icon/icon.component";

@Component({
  selector: 'custom-link',
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomLinkComponent {
  @Input() icon: IconType;
}
