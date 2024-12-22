import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { CompanyListComponent } from './company-list/company-list.component';
import { provideRouter } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { ExchangeComponent } from './exchange/exchange.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigModule } from './translate-config.module';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from "./footer/footer.component"; // Add this line
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PolicyComponent } from './policy/policy.component';
import { TermsandconditionComponent } from './termsandcondition/termsandcondition.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, ExchangeComponent, MetadataComponent,
     CompanyListComponent, TranslateConfigModule, TranslateModule, FooterComponent ,
     CommonModule,HttpClientModule, PolicyComponent, TermsandconditionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'stock-dashboard';

}
