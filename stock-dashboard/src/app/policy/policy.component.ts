import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [ HttpClientModule, TranslateModule, RouterModule ],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.css'
})
export class PolicyComponent {
  constructor(private http: HttpClient, private translate: TranslateService , private router: Router) {
    this.translate.setDefaultLang('en'); // Set default language

  }

}
