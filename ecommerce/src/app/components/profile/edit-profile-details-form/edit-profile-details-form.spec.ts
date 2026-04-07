import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDetailsForm } from './edit-profile-details-form';

describe('EditProfileDetailsForm', () => {
  let component: EditProfileDetailsForm;
  let fixture: ComponentFixture<EditProfileDetailsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDetailsForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDetailsForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
