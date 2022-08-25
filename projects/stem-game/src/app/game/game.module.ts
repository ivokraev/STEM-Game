import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameMenuButtonComponent } from './game-menu/game-menu-button/game-menu-button.component';
import { GameQuestionComponent } from './game-question/game-question.component';


@NgModule({
  declarations: [
    GameMenuComponent,
    GameQuestionComponent,
    GameMenuButtonComponent,
  ],
  imports: [
    GameRoutingModule,

    SharedModule
  ]
})
export class GameModule { }
