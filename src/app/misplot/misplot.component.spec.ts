import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisplotComponent } from './misplot.component';

describe('MisplotComponent', () => {
  let component: MisplotComponent;
  let fixture: ComponentFixture<MisplotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisplotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MisplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
