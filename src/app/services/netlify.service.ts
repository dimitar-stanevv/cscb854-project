import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NetlifyService {
  constructor(private http: HttpClient) { }

  sendMail(emailAddress: string): Promise<any> {
    return lastValueFrom(this.http.post('/.netlify/functions/send-email', {
      recipient: emailAddress
    }));
  }
}
