import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PassDataService } from '../pass-data.service';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {
  facultyID: String = '';
  contextAvailable: boolean;
  context: any = {};
  facultyName: string = '';
  url: string = '';

  constructor(
    private http: HttpClient,
    private _snackBar1: MatSnackBar,
    private router: Router,
    private data: PassDataService
  ) {
    this.data.currentMessage.subscribe((message) => (this.context = message));
    console.log(this.context);
    this.contextAvailable = this.context.isLoggedIn;
    this.facultyName = this.context.facultyName;
    this.facultyID = this.context.facultyID;
    if (!this.contextAvailable) {
      this.router.navigate(['/home']);
      this._snackBar1.open('Entry Unauthorized', '', {
        duration: 2000,
      });
    } else {
      this.getData();
    }
  }
  getData() {
    this.url = `http://192.168.1.12:8000/fetchdetails/${this.facultyID}`;
    console.log(this.url);
    this.http.get(this.url).subscribe((value) => {
      console.log('in resposne', value);
      this.pendingRequests = value;
      console.log(this.pendingRequests, this.pendingRequests[0].Category);
    });
  }
  upperCase() {
    this.facultyID = this.facultyID.toUpperCase();
  }

  pendingRequests: any;
  ngOnInit(): void {
    console.log('in init facutlty');
    this.data.currentMessage.subscribe((message) => (this.context = message));
    console.log(this.context);
  }
  onClick() {
    this.getData();
  }
}
