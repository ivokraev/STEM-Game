import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthData } from 'projects/stem-game/src/app/shared/models/auth-data.model';

import * as AuthActions from '../store/actions/auth.actions'

@Component({
  selector: 'stem-game-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.signupFormInit();
  }

  signupFormInit(): void {
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
      true
    )
    this.store.dispatch(AuthActions.SignUp({authData: authData}));
  }



}
