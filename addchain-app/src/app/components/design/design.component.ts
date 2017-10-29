import { Component, OnInit } from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

  design: Design;

  constructor(
    private designService: DesignService
  ) { }

  ngOnInit() {
    this.getDesign("1");
  }

  getDesign(id: string){
    this.designService.getDesign(id).then(design => this.design = design);
  }
}


