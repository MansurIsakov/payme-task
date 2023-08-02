import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'payme-task';

  public constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.autoLogin();
  }
}
