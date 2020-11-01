import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private router: Router
  ) {}

  top() {
    console.log('TO TOP INIT...!');
    window.scroll(0, 0);
    if (isPlatformBrowser(this.platformId)) {
      this.router.events.subscribe((event: NavigationEnd) => {
        window.scroll(0, 0);
        console.log('TO TOP...!');
      });
    }
  }
}
