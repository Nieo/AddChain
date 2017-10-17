import { Component, OnInit } from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";

@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  designs: Design[];

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
