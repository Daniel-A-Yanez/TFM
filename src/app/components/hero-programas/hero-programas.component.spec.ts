import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProgramasComponent } from './hero-programas.component';

describe('HeroProgramasComponent', () => {
  let component: HeroProgramasComponent;
  let fixture: ComponentFixture<HeroProgramasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProgramasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
