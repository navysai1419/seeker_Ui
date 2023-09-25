import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumanIntAnalyticsComponent } from './human-int-analytics.component';

describe('HumanIntAnalyticsComponent', () => {
  let component: HumanIntAnalyticsComponent;
  let fixture: ComponentFixture<HumanIntAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HumanIntAnalyticsComponent]
    });
    fixture = TestBed.createComponent(HumanIntAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
