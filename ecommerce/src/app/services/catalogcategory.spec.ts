import { TestBed } from '@angular/core/testing';

import { Catalogcategory } from './catalogcategory';

describe('Catalogcategory', () => {
  let service: Catalogcategory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Catalogcategory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
