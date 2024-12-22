import { Routes, provideRouter } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ExchangeComponent } from './exchange/exchange.component';
import { CandleComponent } from './candle/candle.component';
import { MetadataComponent } from './metadata/metadata.component';
import { FooterComponent } from './footer/footer.component';
import { TranslateService } from '@ngx-translate/core';
import { PolicyComponent } from './policy/policy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

export const appRoutes: Routes = [
  // Default route redirects to the companies list

  { path: '', redirectTo: '/exchange', pathMatch: 'full' },
  { path: 'exchange', component: ExchangeComponent },
  { path: 'candle', component: CandleComponent },
  { path: 'metadata', component: MetadataComponent },
  { path: 'policy', component: PolicyComponent },
  { path: 'termsandcondition', component: TermsandconditionComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },



];

export const appRouter = provideRouter(appRoutes);
