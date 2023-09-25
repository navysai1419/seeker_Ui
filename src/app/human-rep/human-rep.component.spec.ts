import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanRepComponent } from './human-rep.component';

describe('HumanRepComponent', () => {
  let component: HumanRepComponent;
  let fixture: ComponentFixture<HumanRepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanRepComponent]
    });
    fixture = TestBed.createComponent(HumanRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
