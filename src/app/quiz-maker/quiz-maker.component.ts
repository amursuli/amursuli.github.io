import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TriviaQuizService } from '../core/services/trivia-quiz/trivia-quiz.service';
import { take } from 'rxjs/operators';
import { Result, TriviaQuizDto } from '../core/models/trivia-quiz-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { handleApiError } from '../shared/utils/handleError';
import { TriviaCategory, TriviaCategoryDto } from '../core/models/trivia-category-dto';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css'],
})
export class QuizMakerComponent {
  form: FormGroup;
  triviaQuiz: Result[] = [];
  categories: TriviaCategory[] = [];

  difficulties: string[] = ['easy', 'medium', 'hard'];

  constructor(private formBuilder: FormBuilder, private triviaQuizService: TriviaQuizService) {
    this.form = this.formBuilder.group({
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getTriviaCategories();
    this.onBeforeUnload();
  }

  private getTriviaQuiz(category: string, difficulty: string): void {
    this.triviaQuizService
      .getTriviaQuiz(category, difficulty)
      .pipe(take(1))
      .subscribe({
        next: (trivia: TriviaQuizDto) => {
          this.triviaQuiz = trivia.results;

          this.triviaQuiz.forEach((question: Result) => {
            question.allAnswers = [...question.incorrect_answers, question.correct_answer];
            question.allAnswers.sort(() => Math.random() - 0.5);
          });
        },
        error: (err: HttpErrorResponse) => {
          handleApiError(err);
        },
      });
  }

  private getTriviaCategories(): void {
    this.triviaQuizService
      .getTriviaCategories()
      .pipe(take(1))
      .subscribe({
        next: (categories: TriviaCategoryDto) => {
          this.categories = categories.trivia_categories;
        },
        error: (err: HttpErrorResponse) => {
          handleApiError(err);
        },
      });
  }

  createTrivia(): void {
    if (this.form.valid) {
      const category: string = this.form.get('category')?.value;
      const difficulty: string = this.form.get('difficulty')?.value;
      this.getTriviaQuiz(category, difficulty);
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(_event?: Event): void {
    localStorage.clear();
  }
}
