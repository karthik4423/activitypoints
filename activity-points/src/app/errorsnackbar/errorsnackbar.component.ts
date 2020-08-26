import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-errorsnackbar',
  templateUrl: './errorsnackbar.component.html',
  styleUrls: ['./errorsnackbar.component.css'],
})
export class ErrorsnackbarComponent implements OnInit {
  constructor() {}
  @Input() errorMessage: string[];
  ngOnInit(): void {}
}
