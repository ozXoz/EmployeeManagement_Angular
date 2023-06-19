import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private apollo: Apollo,
    private router:Router,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  handleLogin(){
    this.router.navigate(['/employees']);
  }

  login(formData: any) {
    if (this.loginForm.invalid) {
      return;
    }

    const loginQuery = gql`
      query login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          email
          password
        }
      }
    `;

    this.apollo
      .query({
        query: loginQuery,
        variables: {
          email: formData.email,
          password: formData.password
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('Login success:', data);
          this.router.navigate(['/employees']);
        },
        error => {
          console.error('Login error:', error);
          if (error.message === 'Invalid email or password') {
            this.loginForm.get('password')?.setErrors({ incorrect: true });
            this.errorMessage = 'Invalid email or password';
          } else {
            this.loginForm.setErrors({ unknown: true });
            this.errorMessage = 'Invalid email or password';
          }
        }
      );
  }
}
