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
    // const trackingAnlytic$ = this.router.events.pipe(
    //   filter( event => event instanceof NavigationEnd )
    // );

    // trackingAnlytic$.subscribe( (event: NavigationEnd) => {
    //   gtag('config', 'G-3KTY73T5HP', {
    //     page_path : event.urlAfterRedirects
    //   });
    // });
    // gtag('config', 'G-3KTY73T5HP');
  }

  ngAfterViewInit(): void {
    const date = new Date().getTime();
    firebase.analytics().logEvent('userConnected', {
      newConnection: true,
      user: `new-user-connected-${date}`
    });
    console.log('analytics...', date);
  }
}
