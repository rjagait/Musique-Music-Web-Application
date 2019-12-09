import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibsecureComponent } from './libsecure.component';

describe('LibsecureComponent', () => {
  let component: LibsecureComponent;
  let fixture: ComponentFixture<LibsecureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibsecureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibsecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
