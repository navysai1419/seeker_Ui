import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseviewComponent } from './databaseview.component';

describe('DatabaseviewComponent', () => {
  let component: DatabaseviewComponent;
  let fixture: ComponentFixture<DatabaseviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatabaseviewComponent]
    });
    fixture = TestBed.createComponent(DatabaseviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
