import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppLocationComponent } from './edit-app-location.component';

describe('EditAppLocationComponent', () => {
  let component: EditAppLocationComponent;
  let fixture: ComponentFixture<EditAppLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAppLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
