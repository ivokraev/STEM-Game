import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthData } from '../shared/models/auth-data.model';

import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'stem-game-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  signupForm!: FormGroup;
  isSignup: boolean = true;

  constructor(private formBuilder: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        {
          validators: [Validators.required],
        },
      ],

      email: [
        null,
        {
          validators: [Validators.required, Validators.email],
        },
      ],

      password: [
        null,
        {
          validators: [Validators.required, Validators.minLength(8)]
        }
      ]
    });
  }

  onFormSubmit(): void {
    const authData = new AuthData(
      this.signupForm.controls['email'].value,
      this.signupForm.controls['password'].value,
      this.isSignup
    );
    this.store.dispatch(AuthActions.AuthStarted({authData}))
  }

  onChangeMode(): void {
    this.isSignup = !this.isSignup;
  }
}
