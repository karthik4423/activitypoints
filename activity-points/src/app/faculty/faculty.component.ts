import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {
  facultyID: String = '';
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/docs').subscribe((value: any) => {
      this.pendingRequests = value;
      console.log(this.pendingRequests);
    });
  }
  upperCase() {
    this.facultyID = this.facultyID.toUpperCase();
  }

  pendingRequests: any;
  ngOnInit(): void {}

  facultyName: string = 'New Faculty';
}
