import { TestBed } from '@angular/core/testing';

import { LocalNewsService } from './local-news.service';

describe('LocalNewsService', () => {
  let service: LocalNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
