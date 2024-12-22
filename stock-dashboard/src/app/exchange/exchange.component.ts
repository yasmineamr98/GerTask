import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-exchange',
  standalone: true,
  imports: [CommonModule, HttpClientModule,FormsModule],
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css'], // Corrected property name
})
export class ExchangeComponent implements OnInit {
  companies: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  // Search and filter properties
  searchQuery: string = '';
  selectedType: string = '';
  selectedCountry: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('assets/exchange.json').subscribe((data) => {
      console.log('Raw data:', data); // Debugging: Verify the structure of the static JSON file

      // Extract the `_source` data from hits
      const extractedData = data.hits.hits.map((hit: any) => hit._source);

      console.log('Extracted data:', extractedData); // Debugging: Verify the extracted data

      // Filter relevant company types
      this.companies = extractedData.filter(
        (item: any) =>
          item.type &&
          [
            'stock',
            'cryptocurrency',
            'exchange traded commodity',
            'exchange traded fund',
            'fund',
            'index',
            'commodity',
            'mutual fund',
          ].includes(item.type.toLowerCase())
      );

      console.log('Filtered companies:', this.companies); // Debugging: Check filtered companies

      // Setup pagination
      this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
      this.paginate();

      // Create the chart
      this.createChart();
    });
  }

  paginate() {
    let filteredCompanies = this.companies;

    // Apply search filter
    if (this.searchQuery) {
      filteredCompanies = filteredCompanies.filter((company) =>
        company.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        company.symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Apply type filter
    if (this.selectedType) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.type.toLowerCase() === this.selectedType.toLowerCase()
      );
    }

    // Apply country filter
    if (this.selectedCountry) {
      filteredCompanies = filteredCompanies.filter(
        (company) => company.country.toLowerCase() === this.selectedCountry.toLowerCase()
      );
    }

    // Setup pagination after applying filters
    this.totalPages = Math.ceil(filteredCompanies.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = filteredCompanies.slice(startIndex, endIndex);

    console.log('Paginated data:', this.paginatedData); // Debugging: Verify paginated data
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  createChart() {
    const chartData = this.companies.reduce((acc: any, company) => {
      acc[company.type] = (acc[company.type] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(chartData);
    const values = Object.values(chartData) as number[];

    new Chart('stockChart', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Company Types',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
