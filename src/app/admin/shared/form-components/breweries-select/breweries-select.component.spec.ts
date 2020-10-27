import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreweriesSelectComponent } from './breweries-select.component';

describe('BreweriesSelectComponent', () => {
  let component: BreweriesSelectComponent;
  let fixture: ComponentFixture<BreweriesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreweriesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreweriesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
