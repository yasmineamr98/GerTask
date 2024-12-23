import { Component, OnInit,AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-candle',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, TranslateModule, RouterModule], // Add FormsModule here
  templateUrl: './candle.component.html',
  styleUrls: ['./candle.component.css'],
})
export class CandleComponent implements OnInit {
  candles: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  searchTerm: string = '';
  selectedCurrency: string = '';
  uniqueCurrencies: string[] = [];
  sortColumn: string = ''; // For the column to sort
  sortOrder: 'asc' | 'desc' = 'asc'; // Sort order, default is ascending

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.translate.setDefaultLang('en'); // Set default language
  }
  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('assets/candle.json').subscribe((data) => {
      console.log('Raw data:', data);

      // Extract the _source data from hits
      const extractedData = data.hits.hits.map((hit: any) => hit._source);

      console.log('Extracted data:', extractedData);

      this.candles = extractedData;
      this.uniqueCurrencies = [...new Set(this.candles.map(candle => candle.currency))]; // Extract unique currencies

      // Setup pagination
      this.totalPages = Math.ceil(this.candles.length / this.itemsPerPage);
      this.paginate();

      // Create the chart
      this.createChart();
    });
  }

  paginate() {
    let filteredCandles = this.candles;

    // Apply search and filter logic
    if (this.searchTerm) {
      filteredCandles = filteredCandles.filter(candle =>
        candle.symbol.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.selectedCurrency) {
      filteredCandles = filteredCandles.filter(candle =>
        candle.currency === this.selectedCurrency
      );
    }

    // Apply sorting based on the sort column and order
    if (this.sortColumn) {
      filteredCandles = filteredCandles.sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (this.sortOrder === 'asc') {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
      });
    }

    // Recalculate pagination based on filtered and sorted data
    this.totalPages = Math.ceil(filteredCandles.length / this.itemsPerPage);
    this.paginatedData = filteredCandles.slice((this.currentPage - 1) * this.itemsPerPage, this.currentPage * this.itemsPerPage);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }

  applyFilters() {
    this.paginate();
  }

  createChart() {
    const chartData = this.candles.reduce((acc: any, candle) => {
      acc[candle.symbol] = (acc[candle.symbol] || 0) + candle.volume;
      return acc;
    }, {});

    const labels = Object.keys(chartData);
    const values = Object.values(chartData) as number[];

    const ctx = document.getElementById('candleChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Candle Volume',
          data: values,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  sortData(column: string) {
    this.sortOrder = this.sortColumn === column && this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortColumn = column;
    this.paginate();
  }
}
