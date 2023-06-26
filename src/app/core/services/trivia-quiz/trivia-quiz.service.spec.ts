import { TestBed } from '@angular/core/testing';

import { TriviaQuizService } from './trivia-quiz.service';

describe('TriviaQuizService', () => {
  let service: TriviaQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TriviaQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
