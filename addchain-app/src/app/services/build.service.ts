import { Injectable } from '@angular/core';
import {Build} from "../models/build";
import {Subject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class BuildService {
  private baseUrl: string = "http://localhost:3000/builds/";
  subject: Subject<Build[]> = new Subject<Build[]>();

  constructor(private http: HttpClient) { }

  public getBuilds(): Observable<Build[]> {
    this.requestBuilds();
    return this.subject.asObservable();
  }
  private requestBuilds(): void{
    this.http.get<Build[]>(this.baseUrl).toPromise()
      .then(builds => {
        this.subject.next(builds as Build[]);
      });
  }
  getBuild(id:string): Promise<Build> {
    return this.http.get(this.baseUrl + id)
      .toPromise()
      .then(response => response as Build)
      .catch( error => console.log(error) );
  }
  createBuild(build: Build): Promise<Build> {
    return this.http.post(this.baseUrl, build)
      .toPromise()
      .then(response => response as Build)
      .catch(error => console.log(error));
  }
  updateBuild(build: Build): Promise<Build> {
    return this.http.put(this.baseUrl + build.build_id, build)
      .toPromise()
      .then(response => {
        this.requestBuilds();
        return response as Build
      })
      .catch(error => {
        console.log(error);
        throw error;
      });
  }
  deleteBuild(build: Build): Promise<any> {
    return this.http.delete(this.baseUrl + build.build_id)
      .toPromise()
      .then( response => true)
      .catch(error => console.log(error));
  }

}
