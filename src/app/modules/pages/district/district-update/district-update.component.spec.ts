import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictUpdateComponent } from './district-update.component';

describe('DistrictUpdateComponent', () => {
  let component: DistrictUpdateComponent;
  let fixture: ComponentFixture<DistrictUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
