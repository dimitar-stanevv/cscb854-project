import { Component, Input, OnInit } from "@angular/core";

export type IconType =
    'arrow'
  | 'code';

@Component({
  selector: 'icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {

  @Input() icon: IconType;

  iconSource = '/assets/images/icons/';

  ngOnInit() {
    if (this.icon !== undefined) {
      switch (this.icon) {
        case 'arrow':
          this.iconSource += 'arrow.svg';
          break;
        case 'code':
          this.iconSource += 'code.svg';
          break;
      }
    }
  }
}
