import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchComponent } from './view-search.component';

describe('ViewSearchComponent', () => {
  let component: ViewSearchComponent;
  let fixture: ComponentFixture<ViewSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ViewSearchComponent]
    });
    fixture = TestBed.createComponent(ViewSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
