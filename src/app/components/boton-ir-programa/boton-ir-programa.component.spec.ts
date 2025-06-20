import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonIrProgramaComponent } from './boton-ir-programa.component';

describe('BotonIrProgramaComponent', () => {
  let component: BotonIrProgramaComponent;
  let fixture: ComponentFixture<BotonIrProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonIrProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonIrProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
