import { Injectable } from '@angular/core';
import { Actor } from '../models/actor.model';
import { resolve } from 'url';
import { reject } from 'q';
import { environment } from 'src/environments/environment';
// import {}
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageService } from './message.service';
import { HttpHeaders, HttpClient, HttpClientModule } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userLoggedIn = new Subject();
  private currentActor: Actor;
  private role = ['EXPLORER', 'MANAGER', 'SPONSOR'];

  constructor(
    private fireAuth: AngularFireAuth,
    private messageService: MessageService,
    private http: HttpClient,
    private cookieService: CookieService) { }

  registerUser(actor: Actor) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.createUserWithEmailAndPassword(actor.email, actor.password)
        .then(_ => {
          const headers = new HttpHeaders();
          headers.append('Content-type', 'application/json');
          const url = `${environment.backendApiBaseURL + '/actors'}`;
          const body = JSON.stringify(actor);
          this.http.post(url, body, httpOptions).toPromise()
            .then(res => {
              this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
              resolve(res);
            }, err => {
              this.messageService.notifyMessage('errorMessages.auth.registration.failed', 'alert alert-danger');
              reject(err);
            });
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.' + error.code.replace(/\//gi, '.'), 'alert alert-danger');
          reject(error);
        });
    });
  }
  login(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(_ => {
          const url = environment.backendApiBaseURL + `/actors?email=` + email;
          const token = this.fireAuth.auth.currentUser.getIdToken;
          console.log(token);
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
              this.setCurrentActor(actor[0], token);
              this.userLoggedIn.next(true);
              this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
              resolve(actor[0]);
            }).catch(error => {
              this.messageService.notifyMessage('errorMessages.auth.login.failed', 'alert alert-danger');
              reject(error);
            });
        }).catch(error => {
          this.messageService.notifyMessage('errorMessages.' +
            error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
          reject(error);
        });
    });
  }
  //       .then(data => {
  //         this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
  //         resolve();
  //       }).catch(error => {
  //         this.messageService.notifyMessage('errorMessages.' +
  //           error.code.replace(/\//gi, '.').replace(/\-/gi, '.'), 'alert alert-danger');
  //         reject(error);
  //       });
  //   });
  // }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.fireAuth.auth.signOut()
        .then(_ => {
          resolve();
        }).catch(error => {
          reject(error);
          this.messageService.notifyMessage(error.code, 'alert alert-danger');
        });
    });
  }
  getRoles() {
    // if (this.currentActor.role === 'ADMINISTRATOR') {
    //   return ['MANAGER'];
    // } else {
    return this.role;

  }

  getCurrentActor() {
    let result = null;
    const currentActor = localStorage.getItem('currentActor');
    if (currentActor) {
      result = JSON.parse(currentActor);
      console.log('currentactor: ' + result.id);
    }
    return result;
  }

  checkRole(roles: string): boolean {
    let result = false;

    if (this.currentActor) {
      if (roles.indexOf(this.currentActor.role.toString()) !== -1) {
        result = true;
      } else {
        result = false;
      }
    } else {
      if (roles.indexOf('anonymous') !== -1) {
        result = true;
      } else {
        result = false;
      }
    }
    return result;
  }

  setCurrentActor(actor: any, token?: any) {
    if (actor) {
      localStorage.setItem('currentActor', JSON.stringify({
        id: actor.id,
        name: actor.name,
        surname: actor.surname,
        role: actor.role,
        preferredLanguage: actor.preferredLanguage
      }));
      if (token) {
        this.cookieService.set('currentToken', token);
      }
    } else {
      localStorage.removeItem('currentActor');
      this.cookieService.delete('currentToken');
    }
  }
}
