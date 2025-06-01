import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaProgramaComponent } from './tarjeta-programa.component';

describe('TarjetaProgramaComponent', () => {
  let component: TarjetaProgramaComponent;
  let fixture: ComponentFixture<TarjetaProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaProgramaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
