import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GameComponent} from "./Components/game/game.component";
import {NewComponent} from "./new/new.component";

const routes: Routes = [
  {path: 'game', component: GameComponent},
  {path: 'new', component: NewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
