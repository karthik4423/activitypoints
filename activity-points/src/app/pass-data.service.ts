import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PassDataService {
  context: any = {
    isLoggedIn: false,
    facultyID: '',
    facultyName: '',
    batch: '',
    department: '',
  };
  private messageSource = new BehaviorSubject(this.context);
  currentMessage = this.messageSource.asObservable();

  constructor() {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }
}
