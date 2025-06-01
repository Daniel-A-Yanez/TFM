import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramasAbiertosComponent } from './programas-abiertos.component';



describe('ProgramasAbiertosComponent', () => {
  let component: ProgramasAbiertosComponent;
  let fixture: ComponentFixture<ProgramasAbiertosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramasAbiertosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramasAbiertosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
