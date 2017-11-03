import {Component, OnInit} from '@angular/core';
import {Design} from "../../models/design";
import {DesignService} from "../../services/design.service";
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {
  design: Design;
  originalDesign: Design;
  viewMode: boolean = true;

  constructor(
    private designService: DesignService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.designService.getDesign(""+params.get('id')))
      .subscribe(design => {
        this.design = design;
        this.originalDesign = JSON.parse(JSON.stringify(design));
      });
  }

  public toggleEdit(){
    this.viewMode = !this.viewMode;
  }
  public save(){
    console.log("Saving");
    this.designService.updateDesign(this.design)
      .then((data) => {
        this.originalDesign = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.design = JSON.parse(JSON.stringify(this.originalDesign));
    this.viewMode = true;
  }
  public remove(){
    this.designService.deleteDesign(this.design)
      .then((data) => {
        console.log("deleted ");
        this.router.navigateByUrl('/');
      });
  }
}


