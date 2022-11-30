import { AfterViewInit, Component, ElementRef, Input, Output, ViewChild, ViewEncapsulation, EventEmitter } from "@angular/core";
import { IconType } from "../icon/icon.component";

@Component({
  selector: 'custom-link',
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomLinkComponent implements AfterViewInit {

  @ViewChild('anchorElement') anchorElement: ElementRef<HTMLAnchorElement>;

  @Input() icon: IconType;
  @Input() linkToURL: {
    href: string;
    openInNewTab: boolean;
  };

  @Output() onClick = new EventEmitter<void>();

  ngAfterViewInit() {
    if (this.linkToURL !== undefined && this.linkToURL.href !== undefined) {
      this.anchorElement.nativeElement.href = this.linkToURL.href;
      if (this.linkToURL.openInNewTab) {
        this.anchorElement.nativeElement.target = '_blank';
      }
    }
  }

  onLinkClick() {
    this.onClick.emit();
  }
}
