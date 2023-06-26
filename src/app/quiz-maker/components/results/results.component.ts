import { Component } from '@angular/core';
import { Result } from '../../../core/models/trivia-quiz-dto';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent {
  questions: Result[] = [];
  correctCount: number = 0;

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  ngOnInit(): void {
    this.questions = this.localStorageService.getTriviaResponse();
    this.evaluateResponse();
  }

  evaluateResponse(): number {
    for (const question of this.questions) {
      if (question.correct_answer === question.selectedAnswer) {
        this.correctCount++;
      }
    }
    return this.correctCount;
  }

  createNewQuiz(): void {
    this.router.navigate(['']);
  }
}
