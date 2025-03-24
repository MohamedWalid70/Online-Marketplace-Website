import { TestBed } from '@angular/core/testing';

import { ProductsInfoService } from './products-info.service';

describe('ProductsInfoService', () => {
  let service: ProductsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
