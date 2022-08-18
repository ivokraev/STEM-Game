import { NgModule } from '@angular/core';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game/game.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    GameRoutingModule,

    SharedModule
  ]
})
export class GameModule { }
