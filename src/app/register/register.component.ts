import { AbstractControl } from '@angular/forms';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { confirmPassValidator } from '../validators/passwordConfirmation.validator';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm !: FormGroup;

  constructor(private fb: FormBuilder){
  } 


  ngOnInit(){

    this.registerForm = this.fb.group({
        name: ['',[Validators.required]],
        email: ['',[Validators.required, Validators.email]],
        username: ['',[Validators.required, Validators.pattern(/^\S+$/)]],
        password: ['',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
        passConfirmation: ['',Validators.required],
        addresses: this.fb.array([this.fb.group({street: ['',[Validators.required]], zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,}/)]], city: ['',[Validators.required]], country: ['',[Validators.required, Validators.pattern(/(Australia|Denmark|Yemen)/)]]})])
      },
      {
        validators: confirmPassValidator("password","passConfirmation")
      }
    );
    // console.log(this.addresses);
  }

  handleRegister(){

  }

  get registerControls(){
    return this.registerForm.controls;
  }

  get addresses(){
    return this.registerForm.get('addresses') as FormArray;
  }

  get addressesArray(){
    return (this.registerForm.controls['addresses'] as FormArray).controls as Array<FormGroup>
  }

  // getAddressGroup(address : AbstractControl){
  //   return (this.addresses.controls.find(control => control===address) as FormGroup).controls;
  // }

  addAddress(){
    
    this.addresses.push(this.fb.group({street: ['',[Validators.required]], zipCode: ['', [Validators.required, Validators.pattern(/^[0-9]{5,}/)]], city: ['',[Validators.required]], country: ['',[Validators.required, Validators.pattern(/(Australia|Denmark|Yemen)/)]]}));   
    // console.log('after adding',this.addresses);
  }

  removeAddress(address : AbstractControl){
    let index = this.addresses.controls.findIndex(control => address === control)
    // console.log(index)
    this.addresses.removeAt(index);
    // console.log('after removing',this.addresses);

  }

}
