import { Component, OnInit } from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import { UsersService } from '../user.service';

@Component({
  selector: 'duong-xss',
  template: `
  <h4>Duong project</h4>
  <h4>A trusted URL:</h4>
  <p><a class="e2e-trusted-url" [href]="trustedUrl">Click me</a></p>
  `,
})
export class XssComponent {
  trustedUrl: any;
  constructor(private service: UsersService) {
    this.trustedUrl=this.service.trustedUrl('javascript:alert(document.cookie|| "khong co cookie")');
  }

}
