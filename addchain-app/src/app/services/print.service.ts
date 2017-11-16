import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Print} from "../models/print";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class PrintService {private baseUrl: string = "http://localhost:3000/prints/";
  subject: Subject<Print[]> = new Subject<Print[]>();

  constructor(private http: HttpClient) { }

  public getPrints(): Observable<Print[]> {
    this.requestPrints();
    return this.subject.asObservable();
  }
  private requestPrints(): void{
    this.http.get<Print[]>(this.baseUrl).toPromise()
      .then(prints => {
        this.subject.next(prints as Print[]);
      });
  }
  getPrint(id:string): Promise<Print> {
    return this.http.get(this.baseUrl + id)
      .toPromise()
      .then(response => response as Print)
      .catch( error => {
        console.log(error);
        throw error;
      });
  }
  createPrint(print: Print): Promise<Print> {
    return this.http.post(this.baseUrl, print)
      .toPromise()
      .then(response => response as Print)
      .catch( error => {
        console.log(error);
        throw error;
      });
  }
  updatePrint(print: Print): Promise<Print> {
    return this.http.put(this.baseUrl + print.slm_id, print)
      .toPromise()
      .then(response => {
        this.requestPrints();
        return response as Print
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  deletePrint(print: Print): Promise<any> {
    return this.http.delete(this.baseUrl + print.slm_id)
      .toPromise()
      .then( response => true)
      .catch(error => console.log(error));
  }
}
