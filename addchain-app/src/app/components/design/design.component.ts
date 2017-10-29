import {Component, OnInit, Input} from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ActivatedRoute, ParamMap} from '@angular/router';




@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  design: Design;

  constructor(
    private designService: DesignService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.designService.getDesign(""+params.get('id')))
      .subscribe(design => this.design = design);
  }
}


