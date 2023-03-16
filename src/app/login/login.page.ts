import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  get emailError(): string {
    const email = this.loginForm.controls.email;
    return email.errors?.['required'] ? 'Required' : email.errors?.['email'] ? 'Invalid format' : 'Valid';
  }

  get passwordError(): string {
    const password = this.loginForm.controls.password;
    return password.errors?.['required'] ? 'Required' : 'Valid';
  }

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  signIn() {
    console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }
}
