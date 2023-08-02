import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-nav',
  template: `
    <nav>
      <ul class="flex flex-col gap-2">
        <li>
          <a routerLink="/auth" routerLinkActive="active" class="router-link">
            <user-outline-icon></user-outline-icon>
            <span>Auth</span>
          </a>
        </li>
        <li>
          <a routerLink="/todo" routerLinkActive="active" class="router-link">
            <clipboard-document-list-outline-icon></clipboard-document-list-outline-icon>
            <span>ToDo List</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainNavComponent {}
