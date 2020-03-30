import { Component, AfterViewInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {filter} from 'rxjs/operators';

import * as firebase from 'firebase/app';
declare var gtag;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'covid19mx';

  constructor( private router: Router) {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
    const date = new Date().getTime();
    firebase.analytics().logEvent('userConnected', {
      newConnection: true,
      user: `new-user-connected-${date}`
    });
    console.log('analytics...', date);
  }
}
