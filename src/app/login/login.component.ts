import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  emailRegex : RegExp;

  formValues : {
    email : string;
    password : string;
  }

  constructor(){

    this.emailRegex = new RegExp("([0-9]|[a-z]|[A-Z]|.)@(gmail|yahoo|outlook)\.com")

    this.formValues = {

      email: "",
      password: ""

    }
  }

  handleLogin(passedForm: any){

    console.log(passedForm);

  }
  
}
