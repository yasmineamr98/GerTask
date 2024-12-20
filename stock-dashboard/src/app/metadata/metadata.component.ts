import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-metadata',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css'], // Correct property name
})
export class MetadataComponent implements OnInit {
  metadata: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

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
            backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)', 'rgba(255, 205, 86, 0.2)'],
            borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(255, 205, 86, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });
  }
}
