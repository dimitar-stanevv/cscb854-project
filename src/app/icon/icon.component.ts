import { Component, Input, OnInit } from "@angular/core";

export type IconType = 'arrow' // Only one icon exists in the project...
// In a real scenario this would reflect all possible values

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
      }
    }
  }
}
