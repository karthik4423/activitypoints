import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css'],
})
export class FacultyComponent implements OnInit {
  constructor(private http: HttpClient) {
    this.http.get('http://localhost:8000/docs').subscribe((value: any) => {
      this.pendingRequests = value;
      console.log(this.pendingRequests);
    });
  }

  pendingRequests: any;
  ngOnInit(): void {}

  facultyName: string = 'New Faculty';
}
