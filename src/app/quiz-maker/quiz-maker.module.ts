import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizMakerRoutingModule } from './quiz-maker-routing.module';
import { QuizMakerComponent } from './quiz-maker.component';
import { ResultsComponent } from './components/results/results.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuizMakerComponent, ResultsComponent, QuizComponent],
  imports: [CommonModule, QuizMakerRoutingModule, ReactiveFormsModule],
})
export class QuizMakerModule {}
