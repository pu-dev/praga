import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGuestMainComponent } from './view-guestmain-.component';

describe('ViewGuestMainComponent', () => {
  let component: ViewGuestMainComponent;
  let fixture: ComponentFixture<ViewMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGuestMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGuestMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
