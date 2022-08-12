import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthData } from 'projects/stem-game/src/app/shared/models/auth-data.model';

import * as AuthActions from '../store//auth.actions'


@Component({
  selector: 'stem-game-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store) { }

  ngOnInit(): void {
    this.signupFormInit();
  }

  signupFormInit(): void {
    this.signupForm = this.formBuilder.group({


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
      false
    )
    this.store.dispatch(AuthActions.Login({authData: authData}));
  }



}
