import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from './features/auth/auth.service';
import { ThemeService } from './core/services/theme.service';
import { Observable } from 'rxjs';

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
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this._authService.autoLogin();
    this.isDarkEnabled$ = this._themeService.isDarkEnabled$;
  }
}
