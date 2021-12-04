import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

interface ValidationResult {
  [s: string]: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;

  get hobbyControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.asyncForbiddenEmail)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    })

    this.signupForm.setValue({
      'userData':{
        'username':'silas',
        'email':'ulisses@email.com'
      },
      'gender':'male',
      'hobbies':[]
    })
  }

  onSubmit() {
    console.log(this.signupForm.value);
    console.log(this.signupForm);
    this.signupForm.reset({'gender':'male'})
    console.log(this.signupForm.value);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (this.signupForm.get('hobbies') as FormArray).push(control)
  }

  forbiddenNames(control: FormControl): ValidationResult {
    const names = ['admin', 'adm'];
    if (names.includes(control.value)) {
      return { 'nameIsForbidden': true }
    }
    return null;
  }

  asyncForbiddenEmail(control: FormControl): Observable<ValidationResult> {
    return of(control.value == 'ulisses@email.com')
      .pipe(delay(1000),
        map(res => {
          return res ? { 'emailIsForbidden': true } : null;
        }));
  }
}
