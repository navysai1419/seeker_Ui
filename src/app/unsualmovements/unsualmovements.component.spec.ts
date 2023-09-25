import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsualmovementsComponent } from './unsualmovements.component';

describe('UnsualmovementsComponent', () => {
  let component: UnsualmovementsComponent;
  let fixture: ComponentFixture<UnsualmovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsualmovementsComponent]
    });
    fixture = TestBed.createComponent(UnsualmovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
