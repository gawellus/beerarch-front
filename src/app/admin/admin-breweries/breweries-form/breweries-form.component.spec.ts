import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweriesFormComponent } from './breweries-form.component';

describe('BreweriesFormComponent', () => {
  let component: BreweriesFormComponent;
  let fixture: ComponentFixture<BreweriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
