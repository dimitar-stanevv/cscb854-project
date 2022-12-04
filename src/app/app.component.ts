import { Component } from '@angular/core';
import { NetlifyService } from './services/netlify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private netlifyService: NetlifyService) {}

  email = '';
  emailSent = false;

  sendEmailThroughNetlify() {
    console.log(`Sending email to ${this.email}...`);
    try {
      this.netlifyService.sendMail(this.email);
    } catch (error) {
      // TODO: Handle error(s)
    } finally {
      this.emailSent = true;
      this.email = '';
    }

    setTimeout(() => this.emailSent = false, 3000);
  }
}
