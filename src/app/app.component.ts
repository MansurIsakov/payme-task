import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'payme-task';

  public constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this._authService.autoLogin();
  }
}
