import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../translatable/translatable.component'
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {

  constructor(private translateService: TranslateService,
              private messageService: MessageService,
              private authService: AuthService) {
    super(translateService);
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        this.messageService.notifyMessage('messages.auth.logout', 'aler alert-success');
      }).catch(error => {
        this.messageService.notifyMessage('errorMessages.auth.log.failed', 'alert alert-danger');
        console.log(error);
      });
  }

  ngOnInit() {
  }

}
