import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketSummary } from './basket-summary';

describe('BasketSummary', () => {
  let component: BasketSummary;
  let fixture: ComponentFixture<BasketSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketSummary);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
