import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorsnackbarComponent } from '../errorsnackbar/errorsnackbar.component';

import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { UploadCertificateService } from '../upload-certificate.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import {
  Cat12FinalData,
  Cat3FinalData,
  Cat5FinalData,
  Cat6FinalData,
} from './interfaces';

@Component({
  selector: 'app-useroptions',
  templateUrl: './useroptions.component.html',
  styleUrls: ['./useroptions.component.css'],
})
export class UseroptionsComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files = [];
  // Note : This whole thing can be really shortened if we implement interfaces for the 6 broad categories
  // of certificates (aka options as of now).
  // I won't do it. I'm tired.
  cat12data: Cat12FinalData = { level: '', prize: 'N/A' };
  cat3data: Cat3FinalData = {
    specification: '',
    level: '',
    setLevel(lev) {
      this.level = lev;
    },
  };
  cat5data: Cat5FinalData = { specification: '' };
  cat6data: Cat6FinalData = { specification: '', role: '' };
  myControl = new FormControl();
  muthootIDUpper: string = '';
  file: any;
  fileName: string = '';
  errorMessage: string[] = ['There are some problems'];
  muthootID: string = '';
  category: string = '';
  level: string = 'N/A';
  prize: string = 'N/A';
  role: string = 'N/A';
  specification: string = 'N/A';
  cat3Specification: string = '';
  cat5Specification: string = '';
  cat6Specification: string = '';
  cat6RoleSpecification: string = '';
  prizes: string[] = ['First', 'Second', 'Third'];
  levels: string[] = [
    'College Event',
    'Zonal Event',
    'State/ University Event',
    'National Event',
    'International Event',
  ];
  options: string[] = [
    'National Initiatives Participation - NCC, NSS',
    'Sports & Games Participation',
    'Cultural Activities Participation',
    'Professional Self Initiatives',
    'Foreign Language Skill (TOFEL/IELTS/BEC exams etc.)',
    'Entrepreneurship and Innovation',
    'Leadership & Management',
  ];

  category3: string[] = [
    'Tech Fest, Tech Quiz',
    'Competitions conducted by Professional Societies - (IEEE, IET, ASME, SAE, NASA etc.)',
    'MOOC with final assessment certificate',
    'Attending Full time Conference/ Seminars / Exhibitions/ Workshop/ STTP conducted at IITs /NITs',
    'Paper presentation/publication at IITs/NITs',
    'Poster Presentation at IITs /NITs',
    'Industrial Training/Internship (atleast for 5 full days)',
    'Industrial/Exhibition visits',
  ];

  category5: string[] = [
    'Start-up Company – Registered legally',
    'Patent-Filed',
    'Patent - Published',
    'Patent- Approved',
    'Patent- Licensed',
    'Prototype developed and tested',
    'Awards for Products developed',
    'Innovative technologies developed and used by industries/users',
    'Got venture capital funding for innovative ideas/products',
    'Startup Employment (Offering jobs to two persons not less than Rs. 15000/- per month)',
    'Societal innovations',
  ];

  category6: string[] = [
    'Student Professional Societies (IEEE, IET, ASME, SAE, NASA etc.)',
    'College Association Chapters ',
    'Festival & Technical Events (College approved)',
    'Hobby Clubs',
    'Special Initiatives',
    'Elected student representatives',
  ];

  filteredOptions: Observable<string[]>;
  constructor(
    private _snackBar1: MatSnackBar,
    private _snackBar2: MatSnackBar,
    private http: HttpClient //private uploadService: UploadCertificateService
  ) {}
  // uploadFile(file) {
  //   const formData = new FormData();
  //   formData.append('file', file.data);
  //   file.inProgress = true;
  //   this.uploadService
  //     .upload(formData)
  //     .pipe(
  //       map((event) => {
  //         switch (event.type) {
  //           case HttpEventType.UploadProgress:
  //             file.progress = Math.round((event.loaded * 100) / event.total);
  //             break;
  //           case HttpEventType.Response:
  //             return event;
  //         }
  //       }),
  //       catchError((error: HttpErrorResponse) => {
  //         file.inProgress = false;
  //         return of(`${file.data.name} upload failed.`);
  //       })
  //     )
  //     .subscribe((event: any) => {
  //       if (typeof event === 'object') {
  //         console.log(event.body);
  //       }
  //     });
  // }
  // private uploadFiles() {
  //   this.fileUpload.nativeElement.value = '';
  //   this.files.forEach((file) => {
  //     this.uploadFile(file);
  //   });
  // }
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  uploadDetails: string;
  elem: any;
  logDetails() {
    this.elem = document.getElementById('finalDetails');
    this.uploadDetails = this.elem.innerText;
    console.log(this.uploadDetails);
    var a = JSON.parse(this.uploadDetails);
    console.log(a);
  }

  clearSearch() {
    var element = document.getElementById('categoryOptions');
    console.log(element);
    element.setAttribute('value', '');
  }

  upperCase() {
    this.muthootIDUpper = this.muthootID.toUpperCase();
  }
  onChange() {
    this.file = document.getElementById('fileUpload');
    this.fileName = this.file.value.slice(12);
  }
  fileSnackBar() {
    this._snackBar2.open('Please upload a .pdf file', '', {
      duration: 2000,
    });
    this.file = null;
    this.fileName = '';
  }
  onClick() {
    console.log('clicked');
    if (this.muthootID == '') {
      this.errorMessage.push('ID cannot be blank \n');
    }
    if (this.category == '') {
      this.errorMessage.push('Category cannot be blank \n');
    }

    if (this.errorMessage.length > 1) {
      console.log('incomplete field');

      this._snackBar1.openFromComponent(ErrorsnackbarComponent, {
        duration: 2000,
        panelClass: ['snackbar-style'],
      });
      this.errorMessage = [];
    } else {
      console.log('all okay');
    }

    this.logDetails();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  postData() {
    this.http.post('http:localhost:8000/postData', this.uploadDetails);
  }
}
