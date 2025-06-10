import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroPaginasComponent } from './hero-paginas.component';

describe('HeroPaginasComponent', () => {
  let component: HeroPaginasComponent;
  let fixture: ComponentFixture<HeroPaginasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroPaginasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroPaginasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
