import { Component, ElementRef, ViewChild } from '@angular/core';
import { NetlifyService } from './services/netlify.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private netlifyService: NetlifyService) {}

  @ViewChild('page2') page2: ElementRef<HTMLDivElement>;
  @ViewChild('page3') page3: ElementRef<HTMLDivElement>;
  @ViewChild('page4') page4: ElementRef<HTMLDivElement>;

  email = '';
  emailSent = false;
  emailIsValid = false;
  emailError = false;

  updateEmail(newEmail: string) {
    // Validate email address:
    this.emailIsValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(newEmail);
  }

  async sendEmailThroughNetlify() {
    console.log(`Sending email to ${this.email}...`);
    try {
      await this.netlifyService.sendMail(this.email);
      this.emailSent = true;
      setTimeout(() => this.emailSent = false, 3000);
      this.email = '';
    } catch (error) {
      this.emailError = true;
    }
  }

  scrollToPage2() {
    window.scrollTo({
      top: this.page2.nativeElement.offsetTop - 50,
      behavior: 'smooth'
    });
  }

  scrollToPage3() {
    window.scrollTo({
      top: this.page3.nativeElement.offsetTop + 50,
      behavior: 'smooth'
    });
  }

  scrollToPage4() {
    window.scrollTo({
      top: this.page4.nativeElement.offsetTop - 30,
      behavior: 'smooth'
    });
  }
}
