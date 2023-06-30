import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserDataService } from '../user-data.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  successMessage: string = "";
  errMessage: string = "";
  isSuccess: boolean = false;
  isError: boolean = false;

  ngOnInit(): void {
    this.initForm()
  }

  constructor(private userService: UserDataService) { }

  registerFormGroup!: FormGroup;

  register(form: FormGroup) {
    const userPassword = form.value.password;
    const userRepeatPassword = form.value.repeat_password;

  
    if (userPassword != userRepeatPassword) {
      alert(environment.MESSAGE_CONFIRM_PASSWOR)
    } else {
      // this.userService.addOne(form.value).subscribe(foods => {
      //   this.resetForm()
      // })

      this.userService.addOne(form.value).subscribe({
        next: (foods) => this.success(),
        error: (error) => this.fail()
      })

    }
  }

  

  resetForm() {
    this.registerFormGroup = new FormGroup({
      name: new FormControl(""),
      username: new FormControl(""),
      password: new FormControl(""),
      repeat_password: new FormControl("")
    })
  }

  initForm() {
    this.registerFormGroup = new FormGroup({
      name: new FormControl(),
      username: new FormControl(),
      password: new FormControl(),
      repeat_password: new FormControl()
    })
  }

  success() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = environment.MESSAGE_REGISTER_SUCCUESS;
    this.errMessage = "";
    this.isSuccess = true;
    this.isError = false;
    this.resetForm()

  }

  fail() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_BLOCK;
    }
    this.successMessage = "";
    this.errMessage = environment.MESSAGE_REGISTER_FAIL;
    this.isSuccess = false;
    this.isError = true;
  }

  btnCloseAlert() {
    const btn = document.getElementById(environment.HIDDEN_ALERT_ID);
    if (btn != null) {
      btn.style.display = environment.DISPLAY_NONE;
    }
  }

}
