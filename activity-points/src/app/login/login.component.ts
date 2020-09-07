import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PassDataService } from '../pass-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData: any = { facultyID: '', facultyPassword: '' };
  response: any;
  message: String = '';
  messageFromService: any;
  context: any = {
    isLoggedIn: '',
    facultyID: '',
    facultyName: '',
    batch: '',
    department: '',
  };

  constructor(
    private http: HttpClient,
    private _snackBar1: MatSnackBar,
    private router: Router,
    private data: PassDataService
  ) {}

  ngOnInit(): void {
    this.data.currentMessage.subscribe(
      (message) => (this.messageFromService = message)
    );
    console.log(this.messageFromService);
  }
  upperCase() {
    this.loginData.facultyID = this.loginData.facultyID.toUpperCase();
  }

  changeContext() {
    console.log('in change context');
    this.data.changeMessage(this.context);
    console.log(this.context);
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
        console.log(this.response);
        console.log(this.response[0].MuthootID);
        if (this.response.length > 0) {
          this.context.isLoggedIn = true;
          this.context.facultyID = this.response[0].MuthootID;
          this.context.facultyName = this.response[0].Name;
          this.context.batch = this.response[0].Batch;
          this.context.department = this.response[0].Branch;
          this.changeContext();
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
      });
  }
}
