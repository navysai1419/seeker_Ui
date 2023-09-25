import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitAnalyticsComponent } from './cit-analytics.component';

describe('CitAnalyticsComponent', () => {
  let component: CitAnalyticsComponent;
  let fixture: ComponentFixture<CitAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitAnalyticsComponent]
    });
    fixture = TestBed.createComponent(CitAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
