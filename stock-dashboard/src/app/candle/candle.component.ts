// candle.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-candle',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './candle.component.html',
  styleUrls: ['./candle.component.css'],
})
export class CandleComponent implements OnInit {
  candles: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('assets/candle.json').subscribe((data) => {
      console.log('Raw data:', data);

      // Extract the `_source` data from hits
      const extractedData = data.hits.hits.map((hit: any) => hit._source);

      console.log('Extracted data:', extractedData);

      this.candles = extractedData;

      // Setup pagination
      this.totalPages = Math.ceil(this.candles.length / this.itemsPerPage);
      this.paginate();

      // Create the chart
      this.createChart();
    });
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.candles.slice(startIndex, endIndex);
    console.log('Paginated data:', this.paginatedData);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  createChart() {
    const chartData = this.candles.reduce((acc: any, candle) => {
      acc[candle.symbol] = (acc[candle.symbol] || 0) + candle.volume;
      return acc;
    }, {});

    const labels = Object.keys(chartData);
    const values = Object.values(chartData) as number[];

    new Chart('candleChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Volume by Symbol',
            data: values,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
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
      },
    });
  }
}
