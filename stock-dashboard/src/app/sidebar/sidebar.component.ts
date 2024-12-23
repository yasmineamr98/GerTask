import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, TranslateModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  activeTab: string = 'exchange';

  constructor(private router: Router) {}

  ngOnInit() {
    // Set the default tab to 'exchange'
    this.navigateToTab(this.activeTab);
  }

  navigateToTab(tab: string) {
    this.activeTab = tab;
    this.router.navigate([`/${tab}`]);
  }
}
