import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Personnel } from '../Models/Personnel';

@Injectable({
  providedIn: 'root'
})
export class PersonnelServiceService {
  PersonnelsData :any=[];
  constructor(private http: HttpClient) { }

  private urlGetAllPersonnels = "http://localhost:8281/api/personnel/all" ;
  getAllPersonnels(): Observable<any> {
    return this.http.get<any>(`${this.urlGetAllPersonnels}`)
  }

  private urlGetPersonnelByMle = 'http://localhost:8281/api/personnel';
  getPersonnel(mle : string): Observable<any> {
  return this.http.get<any>(`${this.urlGetPersonnelByMle}/${mle}`);}

  private urlGetQualificationDePersonnel = 'http://localhost:8281/api/personnel/qualification';
  getQualificationDePersonnel(mle : string): Observable<string> {
    return this.http.get<string>(`${this.urlGetQualificationDePersonnel}/${mle}`);}
  




}
