import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePasswordForm } from './update-password-form';

describe('UpdatePasswordForm', () => {
  let component: UpdatePasswordForm;
  let fixture: ComponentFixture<UpdatePasswordForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePasswordForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePasswordForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
