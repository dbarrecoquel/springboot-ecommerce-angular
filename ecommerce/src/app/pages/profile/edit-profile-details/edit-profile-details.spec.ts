import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDetails } from './edit-profile-details';

describe('EditProfileDetails', () => {
  let component: EditProfileDetails;
  let fixture: ComponentFixture<EditProfileDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditProfileDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
