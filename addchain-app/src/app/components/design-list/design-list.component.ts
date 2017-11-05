import {Component, OnInit, Input} from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ParamMap, ActivatedRoute} from "@angular/router";
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-design-list',
  templateUrl: './design-list.component.html',
  styleUrls: ['./design-list.component.scss']
})
export class DesignListComponent implements OnInit {
  designs: Design[];
  currentDesignID : number;
  sub: any;
  constructor(
      private designService: DesignService,
      private route: ActivatedRoute
      ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getDesigns();
      this.currentDesignID = +params['id'];
    });
  }
  getDesigns(){
      this.designService.getDesigns().then(designs => this.designs = designs);
  }
}
