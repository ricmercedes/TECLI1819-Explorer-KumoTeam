import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Application } from '../models/application.model';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  applicationsUrl = environment.backendApiBaseURL + '/applications';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getApplication(id: string) {
    const url = `${this.applicationsUrl}/${id}`;
    return this.http.get<Application>(url).toPromise();
  }

  getApplications() {
    const url = `${this.applicationsUrl}`;
    return this.http.get<Application[]>(url).toPromise();
  }

  postApplications(application: any) {
    return new Promise<any>((resolve, reject) => {
      const headers = new HttpHeaders();
      headers.append('Content-type', 'application/json');
      const url = `${environment.backendApiBaseURL + '/applications'}`;
      const body = JSON.stringify(application);
      this.http.post( url, body, httpOptions).toPromise()
        .then(res => {
          this.messageService.notifyMessage('messages.auth.registration.correct', 'alert alert-success');
          resolve(res);
        }, err => {
          this.messageService.notifyMessage('errorMessages.auth.registration.failed', 'alert alert-danger');
          reject(err);
        });
    });
  }
}