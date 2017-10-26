import { Component, OnInit } from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";

@Component({
  selector: 'app-design-list',
  templateUrl: './design-list.component.html',
  styleUrls: ['./design-list.component.scss']
})
export class DesignListComponent implements OnInit {
  designs: Design[]
     
  constructor(
      private designService: DesignService
      ) { }


  ngOnInit() {
      this.getDesigns();
  }
  getDesigns(){
      this.designService.getDesigns().then(designs => this.designs = designs);
  }
}
