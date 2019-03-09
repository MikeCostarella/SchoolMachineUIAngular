import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictCreateComponent } from './district-create.component';

describe('DistrictCreateComponent', () => {
  let component: DistrictCreateComponent;
  let fixture: ComponentFixture<DistrictCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
