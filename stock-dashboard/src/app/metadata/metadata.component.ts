import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-metadata',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'],
})
export class MetadataComponent implements OnInit, AfterViewInit {
  metadata: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  searchQuery: string = '';
  selectedType: string = '';
  selectedCountry: string = '';
  uniqueCountries: string[] = [];
  chartInstance: any;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Set default language
  }

  ngOnInit() {
    this.fetchData();
  }

  ngAfterViewInit() {
    // Listen for language changes to update the chart
    this.translate.onLangChange.subscribe(() => {
      this.createChart();
    });
  }

  fetchData() {
    this.http.get<any>('assets/metadata.json').subscribe((data) => {
      const extractedData = data.hits.hits.map((hit: any) => hit._source);
      this.metadata = extractedData.filter((item: any) => item.symbol && item.type);
      this.uniqueCountries = [...new Set(this.metadata.map((item) => item.countryName))];
      this.totalPages = Math.ceil(this.metadata.length / this.itemsPerPage);
      this.paginate();
      this.createChart();
    });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedData = this.metadata.slice(startIndex, startIndex + this.itemsPerPage);
  }

  filterData() {
    let filteredData = this.metadata;

    if (this.searchQuery) {
      filteredData = filteredData.filter(
        (item) =>
          item.symbol.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    if (this.selectedType) {
      filteredData = filteredData.filter((item) => item.type === this.selectedType);
    }

    if (this.selectedCountry) {
      filteredData = filteredData.filter((item) => item.countryName === this.selectedCountry);
    }

    this.totalPages = Math.ceil(filteredData.length / this.itemsPerPage);
    this.metadata = filteredData;
    this.paginate();
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.paginate();
    }
  }

  createChart(): void {
    const canvas = document.getElementById('candleChart') as HTMLCanvasElement;
    if (canvas) {
      if (this.chartInstance) {
        this.chartInstance.destroy(); // Destroy the previous chart instance if it exists
      }

      // Process data to get type counts
      const typeCounts: { [key: string]: number } = {};
      this.metadata.forEach((item) => {
        const type = item.type.toLowerCase();
        if (typeCounts[type]) {
          typeCounts[type]++;
        } else {
          typeCounts[type] = 1;
        }
      });

      const chartLabels = Object.keys(typeCounts);
      const chartData = Object.values(typeCounts);

      this.translate.get('CHART').subscribe(() => {
        this.chartInstance = new Chart(canvas, {
          type: 'pie', // Pie chart
          data: {
            labels: chartLabels, // Labels based on unique types
            datasets: [
              {
                label: 'Types',
                data: chartData, // Data based on the count of each type
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
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
      });
    } else {
      this.translate.get('CHART.ERROR').subscribe((errorMessage) => {
        console.error(errorMessage);
      });
    }
  }
}
