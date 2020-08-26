import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsnackbarComponent } from './errorsnackbar.component';

describe('ErrorsnackbarComponent', () => {
  let component: ErrorsnackbarComponent;
  let fixture: ComponentFixture<ErrorsnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
