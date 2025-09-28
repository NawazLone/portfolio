import { Routes } from '@angular/router';
import { PopupComponent } from './components/popup/popup.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/popup', pathMatch: 'full' },
  { path: 'popup', component: PopupComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: '**', redirectTo: '/popup' }
];
