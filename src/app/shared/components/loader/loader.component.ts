import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  public isLoading$ = this.loaderService.isLoading$;

  public constructor(private loaderService: LoaderService) {}
}
