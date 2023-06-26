import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/local-storage/local-storage.service';
import { TriviaQuizService } from './services/trivia-quiz/trivia-quiz.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [LocalStorageService, TriviaQuizService],
})
export class CoreModule {}
