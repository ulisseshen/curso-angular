import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    defaultSubscription = 'advanced'
    submitted = false;

    onSubmit(form:NgForm){
      console.log(form.value);
      this.submitted = true;
    }
}
