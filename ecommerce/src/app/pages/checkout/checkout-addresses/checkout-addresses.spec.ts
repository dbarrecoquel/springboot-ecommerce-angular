import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutAddresses } from './checkout-addresses';

describe('CheckoutAddresses', () => {
  let component: CheckoutAddresses;
  let fixture: ComponentFixture<CheckoutAddresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutAddresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutAddresses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
