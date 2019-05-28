import { Component, OnInit } from '@angular/core';
import { TranslatableComponent } from '../../translatable/translatable.component'
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Actor } from '../../../models/actor.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends TranslatableComponent implements OnInit {
  currentActor: Actor;
  private userLoggedIn: boolean;
  private activeRole: string = 'anonymous';

  constructor(
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) {
    super(translateService);
  }

  ngOnInit() {

    this.currentActor = this.authService.getCurrentActor();
    if (this.currentActor != null) {
      this.activeRole = this.currentActor.role.toString();
    } else {
      this.activeRole = 'anonymous';
    }
    this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
      if (loggedIn) {
        this.currentActor = this.authService.getCurrentActor();
        this.activeRole = this.currentActor.role.toString();//localStorage.getItem('activeRole');
      } else {
        this.activeRole = 'anonymous';
        this.currentActor = null;
      }
    });

    // this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
    //   if (loggedIn) {
    //     this.currentActor = this.authService.getCurrentActor();
    //     this.activeRole = this.currentActor.role.toString();
    //   } else {
    //     this.activeRole = 'anonymous';
    //     this.currentActor = null;
    //   }
    // });
  }

  logout() {
    this.authService.logout()
      .then(_ => {
        localStorage.setItem('currentActor', '');
        this.activeRole = 'anonymous';
        this.currentActor = null;
        this.router.navigate(['login']);
        this.messageService.notifyMessage('messages.auth.logout', 'aler alert-success');
      }).catch(error => {
        this.messageService.notifyMessage('errorMessages.auth.log.failed', 'alert alert-danger');
        console.log(error);
      });
  }
}
