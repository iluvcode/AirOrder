import { Injectable, Inject, OnDestroy} from '@angular/core';
import { Member } from './member.model';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { throwError, of  } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  constructor(private http: HttpClient, @Inject("BASE_URL") private baseUrl: string) {
  }
  readonly _baseUrl = "https://localhost:44313/api/Member";
  formData: Member = new Member();
  list: Member[] | undefined;

  //private handleError(error: HttpErrorResponse) {
  //  console.error('server error:', error);
  //  if (error.error instanceof Error) {
  //    const errMessage = error.error.message;
  //    return Observable.throw(errMessage);
  //    // Use the following instead if using lite-server
  //    // return Observable.throw(err.text() || 'backend server error');
  //  }
  //  return Observable.throwError(error);
  //}

  postMember(mem: Member) {
    let params = {
      memInfo : mem
    }
    return this.http.post(`${this.baseUrl}api/Member`, mem).pipe(
      map(data => {
        return data;
      })
     // catchError("error message")
    );
  }
  putMember() {
   
    //return this.http.put()
    var url = this._baseUrl + '/' + this.formData.id;
    return this.http.put(`${this.baseUrl}api/Member/${this.formData.id}`, this.formData);
  }
  deleteMember(id: number) {
    var url = this._baseUrl + '/' + id;
    return this.http.delete(url);
  }
  refreshList() {
    this.http.get(`${this.baseUrl}api/Member`)
      .toPromise()
      .then(res => this.list = res as Member[]);
  }
}
