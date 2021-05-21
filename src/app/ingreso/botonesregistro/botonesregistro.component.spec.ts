import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonesregistroComponent } from './botonesregistro.component';

describe('BotonesregistroComponent', () => {
  let component: BotonesregistroComponent;
  let fixture: ComponentFixture<BotonesregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonesregistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonesregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
