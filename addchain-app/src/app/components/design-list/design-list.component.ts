import {Component, OnInit} from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ActivatedRoute} from "@angular/router";
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
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getDesigns(){
      this.designService.getDesigns().subscribe(designs => {
        this.designs = designs;
        this.designs.sort((a: Design, b: Design) => {
          return a.design_id > b.design_id ? 1 : -1;
        });
      });
  }
}
