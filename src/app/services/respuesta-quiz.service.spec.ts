import { TestBed } from '@angular/core/testing';

import { RespuestaQuizService } from './respuesta-quiz.service';

describe('RespuestaQuizService', () => {
  let service: RespuestaQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RespuestaQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
