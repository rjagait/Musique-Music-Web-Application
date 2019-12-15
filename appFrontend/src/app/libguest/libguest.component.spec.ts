import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibguestComponent } from './libguest.component';

describe('LibguestComponent', () => {
  let component: LibguestComponent;
  let fixture: ComponentFixture<LibguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
