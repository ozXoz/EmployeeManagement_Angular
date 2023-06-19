import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  errorMessage!: string;
  signupForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  handleSignUp() {
    if (this.signupForm.invalid) {
      // If form is invalid, set error message and return
      this.errorMessage = 'Please fill in all required fields and provide a valid email address.';
      return;
    }

    const { username, email, password } = this.signupForm.value;

    const signUpMutation = gql`
      mutation signUp($post: PostSignUp!) {
        signUp(post: $post) {
          username
          email
        }
      }
    `;

    this.apollo
      .mutate({
        mutation: signUpMutation,
        variables: {
          post: {
            username,
            email,
            password
          }
        }
      })
      .subscribe(
        ({ data }) => {
          console.log('Sign up success:', data);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Sign up error:', error);
          this.errorMessage = 'There was an error signing up. Please try again later.';
        }
      );
  }
}
