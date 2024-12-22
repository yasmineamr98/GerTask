import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-termsandcondition',
  standalone: true,
  imports: [  RouterModule,HttpClientModule, TranslateModule, CommonModule],
  templateUrl: './termsandcondition.component.html',
  styleUrl: './termsandcondition.component.css'
})
export class TermsandconditionComponent {
  constructor(private http: HttpClient, private translate: TranslateService , private router: Router) {
    this.translate.setDefaultLang('en'); // Set default language
  }

}
