import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { TranslatableComponent } from '../../translatable/translatable.component';
// import { from } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActorRoleGuard } from '../../../guards/actor-role.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends TranslatableComponent implements OnInit {
  private email: string;
  private returnUrl: string; // tomar en cuenta

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) {

    super(translateService);

  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogout() {
    this.authService.logout()
      .then(_ => {
        this.email = null;
      }).catch(error => {
        console.log(error);
      });
  }

  onLogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.authService.login(email, password)
      .then(_ => {
        form.reset();
        this.email = email;
        localStorage.setItem('Actor_id', _.id);
        this.router.navigateByUrl(this.returnUrl);
        console.log(email + " " + password + _.id);
      }).catch((error) => {
        console.log(error);
        this.messageService.notifyMessage('errorMessages.' +
          error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
      });
  }



}
