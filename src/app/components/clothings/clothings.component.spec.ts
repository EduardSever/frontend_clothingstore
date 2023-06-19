import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingsComponent } from './clothings.component';

describe('ClothingsComponent', () => {
  let component: ClothingsComponent;
  let fixture: ComponentFixture<ClothingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClothingsComponent]
    });
    fixture = TestBed.createComponent(ClothingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
