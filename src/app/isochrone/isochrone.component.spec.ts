import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsochroneComponent } from './isochrone.component';

describe('IsochroneComponent', () => {
  let component: IsochroneComponent;
  let fixture: ComponentFixture<IsochroneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsochroneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IsochroneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
