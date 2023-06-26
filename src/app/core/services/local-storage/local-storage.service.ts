import { Injectable } from '@angular/core';
import { Result } from '../../models/trivia-quiz-dto';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorage = 'triviaResponse';

  saveTriviaResponse(trivia: Result[]): void {
    localStorage.setItem(this.localStorage, JSON.stringify(trivia));
  }

  getTriviaResponse(): Result[] {
    const trivia = localStorage.getItem(this.localStorage);
    return trivia ? JSON.parse(trivia) : null;
  }
}
