import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {SearchService} from "../../services/search.service";
import {SearchResult} from "../../models/search-result";
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public results: SearchResult = new SearchResult([],[],[]); 
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private searchService: SearchService) { 
      }

  ngOnInit() {
      let query = this.route.snapshot.paramMap.get('query');
      this.searchService.get(query).then(result => this.results);
  }
}
