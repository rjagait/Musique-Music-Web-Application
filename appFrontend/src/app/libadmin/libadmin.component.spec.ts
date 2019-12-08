import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibadminComponent } from './libadmin.component';

describe('LibadminComponent', () => {
  let component: LibadminComponent;
  let fixture: ComponentFixture<LibadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
