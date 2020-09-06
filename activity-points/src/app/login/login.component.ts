import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any = { facultyID: '', facultyPassword: '' };
  response: any;
  message: String = '';

  constructor(
    private http: HttpClient,
    private _snackBar1: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}
  upperCase() {
    this.loginData.facultyID = this.loginData.facultyID.toUpperCase();
  }

  onClick() {
    console.log(
      'login',
      this.loginData.facultyID,
      this.loginData.facultyPassword
    );
    this.http
      .get('http://localhost:8000/login', {
        params: {
          facultyID: this.loginData.facultyID,
          password: this.loginData.facultyPassword,
        },
      })
      .subscribe((value: any) => {
        console.log('in');
        this.response = value;
        if (this.response.length > 0) {
          this._snackBar1.open('Login Success!', '', {
            duration: 2000,
          });
          this.router.navigate(['/faculty']);
          this.message = 'Success';
        } else {
          this._snackBar1.open('Login Failed!', '', {
            duration: 2000,
          });
          this.message = 'failed';
        }
        console.log(this.response);
      });
  }
}
