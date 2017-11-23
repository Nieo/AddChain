import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Part} from "../models/part";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PartService {
  private baseUrl: string = "http://localhost:3000/parts/";
  subject:Subject<Part[]> = new Subject<Part[]>();

  constructor(private http:HttpClient) { }

  public getParts(): Observable<Part[]> {
    this.requestParts();
    return this.subject.asObservable()
  }

  private requestParts():void {
    this.http.get<Part[]>(this.baseUrl).toPromise()
      .then(parts => {
        this.subject.next(parts as Part[]);
      });
  }

  getPart(id:string): Promise<Part> {
    return this.http.get(this.baseUrl + id)
      .toPromise()
      .then(response => response as Part)
      .catch(error =>{
        console.log(error);
        throw error;
      });
  
  }


  createPart(part: Part): Promise<Part> {
    return this.http.post(this.baseUrl, part)
      .toPromise()
      .then(response => response as Part)
      .catch(error =>{
         console.log(error);
        throw error;
      });
  }

  updatePart(part: Part): Promise<Part> {
    return this.http.put(this.baseUrl + part.part_id, part)
      .toPromise()
      .then(response => {
        this.requestParts();
        return response as Part
      })
      .catch(error => {
        console.log(error);
        throw error;
      })
  }

  deletePart(part: Part): Promise<any> {
    return this.http.delete(this.baseUrl + part.part_id)
      .toPromise()
      .then(response => true)
      .catch(error => console.log(error));
  }
}

