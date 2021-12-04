import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultSecret: string = 'teacher';
  answer: string = '';
  genders: string[] = ['Masculino', 'Femenino'];
  submitted: boolean = false;

  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    this.form.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  onSubmit() {
    console.log(this.form);
    const { value } = this.form;
    this.user.username = value.userData.username;
    this.user.email = value.userData.email;
    this.user.secretQuestion = value.secret;
    this.user.answer = value.questionAnswer;
    this.user.gender = value.gender;
    this.submitted = true;
    this.form.reset({gender:this.genders[0], secret:this.defaultSecret});
  }
}
