import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcedataviewComponent } from './sourcedataview.component';

describe('SourcedataviewComponent', () => {
  let component: SourcedataviewComponent;
  let fixture: ComponentFixture<SourcedataviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SourcedataviewComponent]
    });
    fixture = TestBed.createComponent(SourcedataviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
