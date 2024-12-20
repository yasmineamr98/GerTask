import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
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
