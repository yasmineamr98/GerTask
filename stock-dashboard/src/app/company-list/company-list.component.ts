import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-company-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule], // Add CommonModule here
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css'],
})
export class CompanyListComponent implements OnInit {
  companies: any[] = [];
  paginatedData: any[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;

  ngOnInit() {
    // Example initialization
    this.companies = [
      { name: 'Company A', symbol: 'A' },
      { name: 'Company B', symbol: 'B' },
    ];
    this.totalPages = Math.ceil(this.companies.length / this.itemsPerPage);
    this.paginate();
  }

  paginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedData = this.companies.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.paginate();
  }
}
