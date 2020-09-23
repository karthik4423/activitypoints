import { Component, OnInit, Input } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  @Input() req: any;
  constructor() {}

  ngOnInit(): void {}

  showCertificate() {}
  approve() {}
  reject() {}
}
