import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, TranslateModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
[x: string]: any;
  searchTerm: string = '';
  isMobileMenuOpen = false;
  noResultsFound = false;
  allData: any[] = []; // Combined data from all JSON files
  filteredData: any[] = [];

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Set default language
  }

  ngOnInit() {
    this.loadAllData();
  }

  loadAllData() {
    const files = ['assets/exchange.json', 'assets/candle.json', 'assets/metadata.json'];
    const requests = files.map((file) => this.http.get<any>(file));

    Promise.all(requests)
      .then((responses) => {
        this.allData = responses.flatMap((response: any) => {
          if (response.hits?.hits) {
            return response.hits.hits.map((hit: any) => hit._source);
          }
          return [];
        });
        console.log('All Data Loaded:', this.allData); // Debugging
      })
      .catch((error) => console.error('Error loading data:', error));
  }

  onSearch() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = [];
      this.noResultsFound = false;
      return;
    }

    this.filteredData = this.allData.filter(
      (item) =>
        item.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.symbol?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.currency?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.noResultsFound = this.filteredData.length === 0;
    console.log('Filtered Data:', this.filteredData); // Debugging
  }

  toggleLanguage(lang: string) {
    this.translate.use(lang); // Switch languages
    console.log(`Language changed to: ${lang}`);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  handleContactClick() {
    alert('Contact: 123-456-789');
  }
}
