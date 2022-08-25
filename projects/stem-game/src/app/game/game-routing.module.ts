import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameGuard } from '../guards/game/game.guard';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameQuestionComponent } from './game-question/game-question.component';

const routes: Routes = [
  {
    path: '',
    component: GameMenuComponent,
    canActivate: [GameGuard],
  },
  {
    path: 'question/:id',
    component: GameQuestionComponent,
    canActivate: [GameGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameRoutingModule {}
