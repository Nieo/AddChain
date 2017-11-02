import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";
import {Design} from "../models/design";

@Injectable()
export class DesignService {
  private baseUrl: string = "http://localhost:3000/designs/";

  constructor(private http: Http) { }

  getDesigns(): Promise<Design[]> {
    return this.http.get(this.baseUrl)
      .toPromise()
      .then(response => response.json() as Design[])
      .catch( error => console.log(error) );
  }
  getDesign(id:string): Promise<Design> {
    return this.http.get(this.baseUrl + id)
    .toPromise()
    .then(response => response.json() as Design)
    .catch( error => console.log(error) );
  }
  createDesign(design: Design): Promise<Design> {
    return this.http.post(this.baseUrl, design)
      .toPromise()
      .then(response => response.json() as Design)
      .catch(error => console.log(error));
  }
  updateDesign(design: Design): Promise<Design> {
    return this.http.put(this.baseUrl + design.design_id, design)
      .toPromise()
      .then(response => response.json() as Design)
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
