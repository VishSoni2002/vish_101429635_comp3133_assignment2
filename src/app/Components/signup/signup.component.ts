import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toast: ToastService
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    this.errorMessage = ""
    if (this.signupForm.valid) {
      const { name, email, password } = this.signupForm.value;

      this.authService.signup(name, email, password).subscribe(
        (res: any) => {
          this.toast.showToast(res)
          this.router.navigate(['/login']);
        },
        (error) => {
          this.errorMessage = error.message || 'Signup failed. Please try again.';
        }
      );
    }
  }
}
