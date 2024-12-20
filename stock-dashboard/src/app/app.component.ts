import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CompanyListComponent } from './company-list/company-list.component';
import { provideRouter } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ExchangeComponent } from './exchange/exchange.component';
import { MetadataComponent } from './metadata/metadata.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent,ExchangeComponent, MetadataComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'stock-dashboard';

}
