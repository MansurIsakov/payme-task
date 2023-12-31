import { Observable, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { DestroyService } from '@core/services/destroy.service';
import { IUserCredentials } from '@shared/interfaces/user-credentials.interface';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class SignInComponent {
  public isPasswordVisible = false;
  public signInForm = this._fb.nonNullable.group({
    email: [
      'nurlan@payme.uz',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [
      '12345678',
      {
        validators: [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{8,}$/),
        ],
      },
    ],
  });

  public constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    @Inject(DestroyService) private _destroy$: Observable<void>,
  ) {}

  public togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  protected onSubmit(): void {
    if (this.signInForm.invalid) {
      return;
    }

    if (this._isValidFormValue(this.signInForm.value)) {
      this._authService
        .login(this.signInForm.value)
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: () => {
            this._router.navigate(['/todos']);
            this._toastr.success('Successfully logged in');
          },
          error: (error: string) => {
            this._toastr.error(error);
          },
        });
    }
  }

  private _isValidFormValue(
    data: Partial<IUserCredentials>,
  ): data is IUserCredentials {
    return 'email' in data && 'password' in data;
  }
}
