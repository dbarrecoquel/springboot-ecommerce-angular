import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileNavigation } from './profile-navigation';

describe('ProfileNavigation', () => {
  let component: ProfileNavigation;
  let fixture: ComponentFixture<ProfileNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileNavigation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
