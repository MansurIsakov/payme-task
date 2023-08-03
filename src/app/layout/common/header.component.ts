import { NgHeroiconsModule } from '@dimaslz/ng-heroicons';

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ThemeService } from '@core/services/theme.service';

@Component({
  selector: 'app-header',
  template: `
    <header
      class="flex justify-between items-center bg-gray-100 dark:bg-gray-800 py-3 px-12 border-b border-gray-200"
    >
      <!-- Breadcrumbs | TODO: Add dynamic links based on router -->
      <div
        class="flex items-center py-4 gap-5 overflow-x-auto whitespace-nowrap"
      >
        <a routerLink="/" class="text-gray-900 dark:text-gray-200">
          <home-solid-icon [size]="20" />
        </a>

        <chevron-right-solid-icon
          class=" text-gray-500 dark:text-gray-300 "
          [size]="20"
        />

        <a
          routerLink="/todos"
          class="flex items-center gap-2 text-gray-600 font-semibold dark:text-blue-500 hover:underline"
        >
          <clipboard-document-list-solid-icon />
          <span>ToDo List</span>
        </a>
      </div>

      <!-- Theme Switcher -->
      <button
        class="bg-white dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border p-2"
        (click)="changeTheme()"
      >
        <moon-outline-icon
          *ngIf="isDarkEnabled; else isLightEnabled"
          class="text-gray-900 dark:text-white"
        ></moon-outline-icon>

        <ng-template #isLightEnabled>
          <sun-outline-icon
            class="text-gray-900 dark:text-white"
          ></sun-outline-icon>
        </ng-template>
      </button>
    </header>
  `,
  imports: [CommonModule, NgHeroiconsModule, RouterModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public isDarkEnabled: boolean = false;

  public constructor(private _themeService: ThemeService) {}

  public ngOnInit(): void {
    this.isDarkEnabled = this._themeService.isDarkEnabled;
  }

  public changeTheme(): void {
    this._themeService.changeTheme();
    this.isDarkEnabled = this._themeService.isDarkEnabled;
  }
}
