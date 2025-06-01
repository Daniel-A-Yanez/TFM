import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProgramasComponent } from './grid-programas.component';

describe('GridProgramasComponent', () => {
  let component: GridProgramasComponent;
  let fixture: ComponentFixture<GridProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridProgramasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
