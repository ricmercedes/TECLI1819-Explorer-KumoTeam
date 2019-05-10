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
    private http: HttpClient) { }

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
          this.messageService.notifyMessage('messages.auth.login.correct', 'alert alert-success');
          const url = environment.backendApiBaseURL + `/actors?email=` + email;
          this.http.get<Actor[]>(url).toPromise()
            .then((actor: Actor[]) => {
              this.currentActor = actor[0];
              this.userLoggedIn.next(true);
              resolve(this.currentActor);
            }).catch(error => {
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
    if (this.currentActor.role === 'ADMINISTRATOR') {
      return ['MANAGER'];
    } else {
      return this.role;
    }

  }

  getCurrentActor() {
    console.log('currentactor: ' + this.currentActor);
    return this.currentActor;
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
}
