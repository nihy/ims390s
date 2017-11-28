import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassCalcComponent } from './pass-calc.component';

describe('PassCalcComponent', () => {
  let component: PassCalcComponent;
  let fixture: ComponentFixture<PassCalcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassCalcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
