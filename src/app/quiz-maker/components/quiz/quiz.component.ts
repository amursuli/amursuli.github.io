import { Component, Input } from '@angular/core';
import { Result } from '../../../core/models/trivia-quiz-dto';
import { LocalStorageService } from '../../../core/services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @Input()
  questions: Result[] = [];
  selectedAnswer: string[] = [];
  allAnswered: boolean = false;

  constructor(private localStorageService: LocalStorageService, private router: Router) {}

  selectAnswer(question: Result, answer: string, position: number): void {
    this.selectedAnswer[this.questions.indexOf(question)] = answer;
    this.questions[position].selectedAnswer = answer;

    if (this.areAllQuestionsAnswered()) {
      this.allAnswered = true;
    }
  }

  areAllQuestionsAnswered(): boolean {
    let allAnswered = true;
    this.questions.forEach((question: Result) => {
      if (!question.selectedAnswer) {
        allAnswered = false;
      }
    });
    return allAnswered;
  }

  submitQuiz(): void {
    this.localStorageService.saveTriviaResponse(this.questions);
    this.router.navigate(['results']);
  }
}
