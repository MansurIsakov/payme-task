import { Observable } from 'rxjs';

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from '@auth/auth.service';
import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'payme-task';
  public isDarkEnabled$!: Observable<boolean>;

  public constructor(
    private _authService: AuthService,
    private _themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this._authService.autoLogin();
    this.isDarkEnabled$ = this._themeService.isDarkEnabled$;
  }
}
