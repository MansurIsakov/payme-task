import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-main-nav',
  template: `
    <nav>
      <ul class="flex flex-col gap-2 ">
        <li>
          <a routerLink="/todos" routerLinkActive="active" class="router-link">
            <clipboard-document-list-solid-icon />
            <span>ToDo List</span>
          </a>
        </li>
        <li>
          <a
            routerLink="/auth/sign-in"
            class="router-link"
            (click)="onLogout()"
          >
            <arrow-uturn-left-solid-icon />
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {
  constructor(private _authService: AuthService) {}

  public onLogout() {
    this._authService.logout();
  }
}
