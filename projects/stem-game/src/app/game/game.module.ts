import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { SharedModule } from '../shared/shared.module';
import { GameMenuComponent } from './game-menu/game-menu.component';
import { GameMenuButtonComponent } from './game-menu/game-menu-button/game-menu-button.component';
import { GameQuestionComponent } from './game-question/game-question.component';
import { StoreModule } from '@ngrx/store';
import * as fromGame from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GameEffects } from './store/effects/game.effects';


@NgModule({
  declarations: [
    GameMenuComponent,
    GameQuestionComponent,
    GameMenuButtonComponent,
  ],
  imports: [
    GameRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromGame.gameFeatureKey, fromGame.reducers, { metaReducers: fromGame.metaReducers }),
    EffectsModule.forFeature([GameEffects]),
  ]
})
export class GameModule { }
