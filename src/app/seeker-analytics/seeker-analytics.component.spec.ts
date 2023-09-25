import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerAnalyticsComponent } from './seeker-analytics.component';

describe('SeekerAnalyticsComponent', () => {
  let component: SeekerAnalyticsComponent;
  let fixture: ComponentFixture<SeekerAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeekerAnalyticsComponent]
    });
    fixture = TestBed.createComponent(SeekerAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
