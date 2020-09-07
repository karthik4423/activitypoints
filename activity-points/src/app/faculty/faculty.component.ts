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

  constructor(
    private http: HttpClient,
    private _snackBar1: MatSnackBar,
    private router: Router,
    private data: PassDataService
  ) {
    this.data.currentMessage.subscribe((message) => (this.context = message));
    console.log(this.context);
    console.log(this.contextAvailable);
    this.contextAvailable = this.context.isLoggedIn;
    this.facultyName = this.context.facultyName;
    if (!this.contextAvailable) {
      this.router.navigate(['/home']);
      this._snackBar1.open('Entry Unauthorized', '', {
        duration: 2000,
      });
    } else {
      this.http.get('http://localhost:8000/docs').subscribe((value: any) => {
        this.pendingRequests = value;
        console.log(this.pendingRequests);
      });
    }
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
}
