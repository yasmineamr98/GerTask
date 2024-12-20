import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule,HttpClientModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Output() search = new EventEmitter<string>();
  @Output() languageToggle = new EventEmitter<string>();

  searchTerm: string = '';
  isMobileMenuOpen = false; // Track mobile menu state

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  toggleLanguage(lang: string) {
    this.languageToggle.emit(lang);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  // constructor(private translate: TranslateService) {
  //   this.translate.setDefaultLang('en'); // Set default language
  //   this.translate.use('en'); // Use English by default
  // }

  // toggleLanguage(lang: string) {
  //   this.translate.use(lang); // Switch languages
  // }

  // toggleMobileMenu() {
  //   this.isMobileMenuOpen = !this.isMobileMenuOpen;
  // }

}
