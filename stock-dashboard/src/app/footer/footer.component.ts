import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateService , TranslateModule} from '@ngx-translate/core';
import { HttpClient , HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule, HttpClientModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  constructor(private http: HttpClient, private translate: TranslateService  , private router: Router) {
    this.translate.setDefaultLang('en'); // Set default language

}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
