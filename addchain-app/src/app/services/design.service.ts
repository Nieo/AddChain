import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";
import {Design} from "../models/design";

@Injectable()
export class DesignService {
  private baseUrl: string = "http://localhost:3000/designs";

  constructor(private http: Http) { }

  getDesigns(): Promise<Design[]> {
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json() as Design[])
      .catch( error => console.log(error) );
  }
  getDesign(id:string): Promise<Design> {
    return this.http.get(this.baseUrl + "/" + id)
    .toPromise()
    .then(response => response.json() as Design)
    .catch( error => console.log(error) );
  }

}
