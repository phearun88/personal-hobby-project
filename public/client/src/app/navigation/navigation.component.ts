import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';
import { UserDataService } from '../user-data.service';
import { AuthenticationService } from '../authentication.service';

export class Users {

  #name!: string;
  #username!: string;
  #password!: string;

  get name(): string { return this.#name; }
  get username(): string { return this.#username; }
  get password(): string { return this.#password; }

  set name(name: string) { this.#name = name; }
  set username(username: string) { this.#username = username; }
  set password(password: string) { this.#password = password; }

  constructor(name: string, username: string, password: string) {
    this.name = name;
    this.username = username;
    this.password = password;
  }
  toJSON() {
    return {
      "name": this.#name,
      "username": this.#username,
      "password": this.#password
    }
  }
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router, private userService: UserDataService, private authenticationService: AuthenticationService) { }

  loginFormGroup!: FormGroup;


  ngOnInit(): void {

    this.initForm()


  }

  getName(): string {
    return this.authenticationService.getName();
  }

  onHome(): void {
    this._router.navigate(['']);
  }

  onFoods(): void {
    this._router.navigate([environment.FOODS_ENDPOINT]);
  }


  login(form: FormGroup) {
    this.userService.getLogin(form.value).subscribe({
      next: (user) => {

        this.setAuthentication(user)

        this.getName();

        this._router.navigate(['/'])
      },
      error: (error) => { }
    });
  }

  initForm() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    })
  }

  setAuthentication(user: any) {
    this.authenticationService.setToken(user[environment._TOKEN]);
  }

  isLogIn() {
    return this.authenticationService.logIn();
  }

  isLogout() {
    return this.authenticationService.logOut();
  }
}
