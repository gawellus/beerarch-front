import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBreweriesComponent } from './admin-breweries.component';

describe('AdminBreweriesComponent', () => {
  let component: AdminBreweriesComponent;
  let fixture: ComponentFixture<AdminBreweriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBreweriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBreweriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
