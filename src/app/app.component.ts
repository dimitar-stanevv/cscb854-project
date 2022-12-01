import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cscb854';

  email = '';
  emailSent = false;

  sendEmailThroughNetlify() {
    console.log(this.email);
    this.emailSent = true;
    this.email = '';
    setTimeout(() => this.emailSent = false, 3000);
  }
}
