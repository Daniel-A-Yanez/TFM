import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BloqueProgramaHomeComponent } from './bloque-programa-home.component';

describe('BloqueProgramaHomeComponent', () => {
  let component: BloqueProgramaHomeComponent;
  let fixture: ComponentFixture<BloqueProgramaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueProgramaHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueProgramaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
