import { Injectable } from '@angular/core';
import {SearchResult} from "../models/search-result";
import {Build} from "../models/build";
import {HttpClient} from "@angular/common/http";



@Injectable()
export class SearchService {
  private baseUrl: string = "http://localhost:3000/search/";
  constructor(private http: HttpClient) { }

  public get(query): Promise<SearchResult>{
    return this.http.get(this.baseUrl + query)
    .toPromise()
    .then(response => {
      console.log(response);
      console.log(response as SearchResult);
      return response as SearchResult;
    })
    .catch( error => console.log(error) );
  }
}
