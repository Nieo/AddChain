import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Design} from "../models/design";
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs/Subject";

@Injectable()
export class DesignService {
  private baseUrl: string = "http://localhost:3000/designs/";
  subject: Subject<Design[]> = new Subject<Design[]>();

  constructor(private http: HttpClient) { }

  public getDesigns(): Observable<Design[]> {
    this.requestDesigns();
    return this.subject.asObservable();
  }
  private requestDesigns(): void{
    this.http.get<Design[]>(this.baseUrl).toPromise()
      .then(designs => {
        this.subject.next(designs as Design[]);
      });
  }
  getDesign(id:string): Promise<Design> {
    return this.http.get(this.baseUrl + id)
    .toPromise()
    .then(response => response as Design)
    .catch( error => console.log(error) );
  }
  createDesign(design: Design): Promise<Design> {
    return this.http.post(this.baseUrl, design)
      .toPromise()
      .then(response => response as Design)
      .catch(error => console.log(error));
  }
  updateDesign(design: Design): Promise<Design> {
    return this.http.put(this.baseUrl + design.design_id, design)
      .toPromise()
      .then(response => {
        this.requestDesigns();
        return response as Design
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  deleteDesign(design: Design): Promise<any> {
    return this.http.delete(this.baseUrl + design.design_id)
      .toPromise()
      .then( response => true)
      .catch(error => console.log(error));
  }
}
