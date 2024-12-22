import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-metadata',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'], // Correct property name
})
export class MetadataComponent implements OnInit {
  metadata: any[] = [];
  paginatedData: any[] = [];
  searchQuery: string = '';
  selectedType: string = '';
  selectedCountry: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  uniqueCountries: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('assets/metadata.json').subscribe((data) => {
      console.log('Raw metadata:', data);

      // Extract the `_source` data from hits
      const extractedData = data.hits.hits.map((hit: any) => hit._source);

      console.log('Extracted data:', extractedData);

      // Filter relevant data
      this.metadata = extractedData.filter((item: any) => item.symbol && item.type);

      // Extract unique countries
      this.uniqueCountries = [...new Set(this.metadata.map(item => item.countryName))];

      console.log('Filtered metadata:', this.metadata);

      // Setup pagination
      this.totalPages = Math.ceil(this.metadata.length / this.itemsPerPage);
      this.paginate();

      // Create the chart
      this.createChart();
    });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.metadata.slice(startIndex, endIndex);
    console.log('Paginated data:', this.paginatedData);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  filterData() {
    let filteredData = this.metadata;

    // Search filter
    if (this.searchQuery) {
      filteredData = filteredData.filter(item =>
        item.symbol.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Type filter
    if (this.selectedType) {
      filteredData = filteredData.filter(item => item.type === this.selectedType);
    }

    // Country filter
    if (this.selectedCountry) {
      filteredData = filteredData.filter(item => item.countryName === this.selectedCountry);
    }

    // Update pagination and table data
    this.metadata = filteredData;
    this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page after filtering
    this.paginate();
  }

  createChart() {
    const chartData = this.metadata.reduce((acc: any, item) => {
      acc[item.type] = (acc[item.type] || 0) + 1;
      return acc;
    }, {});

    const labels = Object.keys(chartData);
    const values = Object.values(chartData) as number[];

    new Chart('metadataChart', {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            label: 'Metadata Types',
            data: values,
            backgroundColor: ['#28a745', '#007bff', '#ffc107'], // Green, Blue, Yellow for professional tones
            borderColor: ['#218838', '#0069d9', '#e0a800'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 12 },
          },
        },
      },
    });
  }

}
