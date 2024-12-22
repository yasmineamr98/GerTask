import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule for two-way data binding
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-candle',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule], // Add FormsModule here
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

  // Sort the data by the selected column
  sortData(column: string) {
    // If the clicked column is already the current one, toggle the sort order
    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortOrder = 'asc'; // Reset to ascending when a new column is clicked
    }

    // Apply sorting and pagination after sorting
    this.paginate();
  }
}
