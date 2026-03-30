import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketItemCount } from './basket-item-count';

describe('BasketItemCount', () => {
  let component: BasketItemCount;
  let fixture: ComponentFixture<BasketItemCount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketItemCount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasketItemCount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
