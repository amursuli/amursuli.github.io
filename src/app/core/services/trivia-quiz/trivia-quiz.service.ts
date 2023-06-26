import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { handleApiError } from '../../../shared/utils/handleError';
import { TriviaQuizDto } from '../../models/trivia-quiz-dto';
import { TriviaCategoryDto } from '../../models/trivia-category-dto';

@Injectable({
  providedIn: 'root',
})
export class TriviaQuizService {
  private apiUrl = 'https://opentdb.com/api.php';
  private apiCategory = 'https://opentdb.com/api_category.php';

  constructor(private http: HttpClient) {}

  getTriviaCategories(): Observable<TriviaCategoryDto> {
    return this.http.get<TriviaCategoryDto>(this.apiCategory).pipe(catchError(this.errorHandler));
  }

  getTriviaQuiz(category: string, difficulty: string): Observable<TriviaQuizDto> {
    const params = {
      amount: '5',
      category: category,
      difficulty: difficulty,
      type: 'multiple',
    };
    return this.http.get<TriviaQuizDto>(this.apiUrl, { params }).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    handleApiError(error);
    return throwError(() => error);
  }
}
