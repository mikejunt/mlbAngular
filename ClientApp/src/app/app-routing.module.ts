import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HittingDisplayComponent } from './search-interface/hitting-display/hitting-display.component';
import { PitchingDisplayComponent } from './search-interface/pitching-display/pitching-display.component';
import { TrxDisplayComponent } from './search-interface/trx-display/trx-display.component';
import { UserGuard } from './guards/user.guard';
import { TeamLandingComponent } from './team-landing/team-landing.component';

const routes: Routes = [
  { path: 'hitting', component: HittingDisplayComponent, canActivate: [UserGuard] },
  { path: 'pitching', component: PitchingDisplayComponent, canActivate: [UserGuard] },
  { path: 'trans', component: TrxDisplayComponent, canActivate: [UserGuard] },
  { path: 'landing', component: TeamLandingComponent, canActivate: [UserGuard], },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
