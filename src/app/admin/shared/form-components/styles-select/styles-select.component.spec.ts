import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StylesSelectComponent } from './styles-select.component';

describe('StylesSelectComponent', () => {
  let component: StylesSelectComponent;
  let fixture: ComponentFixture<StylesSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StylesSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StylesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
