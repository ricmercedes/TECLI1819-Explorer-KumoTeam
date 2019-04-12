import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageService } from '../../../services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../translatable/translatable.component';
import { InfoMessage } from './infomessage';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent extends TranslatableComponent implements OnInit, OnDestroy {
  infoMessage: string;
  cssClass: string;
  subscription: Subscription;
  showMessage: boolean = true;

  constructor(private translateService: TranslateService,
              private messageService: MessageService) {
    super(translateService);
  }

  ngOnInit() {
    this.subscription = this.messageService.message.subscribe(
      (data: InfoMessage) => {
        if (data) {
          this.infoMessage = data.infoMessage;
          this.cssClass = data.cssClass;
          this.showMessage = true;
        } else {
          this.showMessage = false;
        }
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
