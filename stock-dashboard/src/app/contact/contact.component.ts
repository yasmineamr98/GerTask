import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule,RouterModule,TranslateModule,HttpClientModule,FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private http: HttpClient, private translate: TranslateService  , private router: Router) {
    this.translate.setDefaultLang('en'); // Set default language
}
}
