import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighchartRangeComponent } from './highchart-range.component';

describe('HighchartRangeComponent', () => {
  let component: HighchartRangeComponent;
  let fixture: ComponentFixture<HighchartRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighchartRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighchartRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
