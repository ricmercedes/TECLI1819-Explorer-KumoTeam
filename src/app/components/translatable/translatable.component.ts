import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translatable',
  templateUrl: './translatable.component.html',
  styleUrls: ['./translatable.component.css']
})
export class TranslatableComponent implements OnInit {
  private language = 'es';

  constructor(private translate: TranslateService) {
    let lang = localStorage.getItem('language');
    console.log('lenguaje: ' + lang);
    console.log('lenguaje: ' + this.language);
    if (!lang) {
      lang = this.translate.getBrowserLang();
      if (lang) {
        this.language = lang;
      }
      console.log('Idioma: ' + lang);
    } else {
      this.language = lang;
    }
    this.changeLanguage(this.language);
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.translate.setDefaultLang(language);
    this.translate.currentLang = language;


  }

  ngOnInit() {
  }

}
