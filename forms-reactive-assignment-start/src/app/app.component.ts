import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatuses = ['Estável', 'Crítico', 'Finalizado']
  projectForm: FormGroup;

  ngOnInit() {
    this.projectForm = new FormGroup({
      projectName: new FormControl(null, [Validators.required, this.forbiddenName]),
      email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmail),
      status: new FormControl('stable'),
    })
  }

  onSubmit() {
    console.log(this.projectForm.value)
  }

  get projectNameIsEmpty() {
    return this.isControlInvalidWithError('projectName', 'required');
  }

  get projectNameIsForbidden() {
    return this.isControlInvalidWithError('projectName', 'forbiddenName')
  }

  get emailIsEmpty() {
    return this.isControlInvalidWithError('email', 'required');
  }

  get emailIsInvalid() {
    return this.isControlInvalidWithError('email', 'email');
  }

  get emailIsForbidden() {
    return this.isControlInvalidWithError('email', 'emailIsForbidden');
  }

  private isControlInvalidWithError(controlName: string, errorName: string) {
    return !this.projectForm.get(controlName).valid
      && this.projectForm.get(controlName).touched
      && this.projectForm.get(controlName).errors
      && this.projectForm.get(controlName).errors[errorName];
  }

  forbiddenName(control: FormControl): { [s: string]: boolean } {
    if ('Test' === control.value) {
      return { 'forbiddenName': true }
    }
    return null;
  }

  forbiddenEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'ulisses@email.com') {
          resolve({ 'emailIsForbidden': true })
        } else {
          resolve(null);
        }
      }, 700)
    });

    return promise;
  }



}
