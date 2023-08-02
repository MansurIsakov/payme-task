import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public isDarkEnabled$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get isDarkEnabled(): boolean {
    return this.isDarkEnabled$.value;
  }

  public set isDarkEnabled(value: boolean) {
    this.isDarkEnabled$.next(value);
  }

  public constructor() {
    // Check if user has dark mode enabled in their browser
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      this.isDarkEnabled = true;
    }

    this.isDarkEnabled = localStorage.getItem('isDarkEnabled') === 'true';
  }

  public changeTheme(): void {
    this.isDarkEnabled = !this.isDarkEnabled;

    if (this.isDarkEnabled) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }

    localStorage.setItem('isDarkEnabled', `${this.isDarkEnabled}`);
  }
}
