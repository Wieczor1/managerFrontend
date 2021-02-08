import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAppLocationComponent} from './create-app-location.component';

describe('CreateAppLocationComponent', () => {
  let component: CreateAppLocationComponent;
  let fixture: ComponentFixture<CreateAppLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAppLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAppLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
