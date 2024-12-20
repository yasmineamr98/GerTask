import { Routes, provideRouter } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { CandleComponent } from './candle/candle.component';
import { MetadataComponent } from './metadata/metadata.component';

export const appRoutes: Routes = [
  // Default route redirects to the companies list

  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'candle', component: CandleComponent },
  { path: 'metadata', component: MetadataComponent },
];

export const appRouter = provideRouter(appRoutes);
