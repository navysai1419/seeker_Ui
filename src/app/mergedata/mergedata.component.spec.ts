import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergedataComponent } from './mergedata.component';

describe('MergedataComponent', () => {
  let component: MergedataComponent;
  let fixture: ComponentFixture<MergedataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MergedataComponent]
    });
    fixture = TestBed.createComponent(MergedataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
