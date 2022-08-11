import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'stem-game-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

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

  }

  onSignup(): void {
    // this.router.navigate(['signup']);
  }

}
