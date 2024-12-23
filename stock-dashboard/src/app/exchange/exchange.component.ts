import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'],
})
export class ExchangeComponent implements AfterViewInit {
  companies: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  searchQuery: string = '';
  selectedType: string = '';
  selectedCountry: string = '';

  constructor(private http: HttpClient) {}
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('assets/exchange.json').subscribe((data) => {
      const extractedData = data.hits.hits.map((hit: any) => hit._source);

      this.companies = extractedData.filter((item: any) =>
        ['stock', 'cryptocurrency', 'exchange traded commodity', 'exchange traded fund', 'fund', 'index', 'commodity', 'mutual fund']
          .includes(item.type?.toLowerCase())
      );

      this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
      this.paginate();

      this.createChart();
    });
  }

  paginate() {
    let filteredCompanies = this.companies;

    if (this.searchQuery) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        company.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedType) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    if (this.selectedCountry) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.country.toLowerCase() === this.selectedCountry.toLowerCase()
      );
    }

    this.totalPages = Math.ceil(filteredCompanies.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = filteredCompanies.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  createChart(): void {
    const canvas = document.getElementById('stockChart') as HTMLCanvasElement;
    if (canvas) {
      new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['Stock', 'Crypto', 'ETF', 'Mutual Fund'],
          datasets: [
            {
              label: 'Types',
              data: [10, 5, 15, 20], // Example data
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    } else {
      console.error('Canvas element not found.');
    }
  }
}
