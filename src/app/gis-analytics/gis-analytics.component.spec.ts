import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GisAnalyticsComponent } from './gis-analytics.component';

describe('GisAnalyticsComponent', () => {
  let component: GisAnalyticsComponent;
  let fixture: ComponentFixture<GisAnalyticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GisAnalyticsComponent]
    });
    fixture = TestBed.createComponent(GisAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
