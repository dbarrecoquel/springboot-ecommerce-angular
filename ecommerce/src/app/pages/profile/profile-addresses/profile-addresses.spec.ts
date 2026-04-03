import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAddresses } from './profile-addresses';

describe('ProfileAddresses', () => {
  let component: ProfileAddresses;
  let fixture: ComponentFixture<ProfileAddresses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAddresses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAddresses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
