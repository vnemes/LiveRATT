import { TestBed, inject } from '@angular/core/testing';

import { RouteSelectorService } from './route-selector.service';

describe('RouteSelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteSelectorService]
    });
  });

  it('should be created', inject([RouteSelectorService], (service: RouteSelectorService) => {
    expect(service).toBeTruthy();
  }));
});
