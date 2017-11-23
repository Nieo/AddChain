import { Component, OnInit } from '@angular/core';
import {Part} from "../../models/part";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PartService} from "../../services/part.service";

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.scss']
})
export class PartComponent implements OnInit {
  part: Part;
  originalPart: Part;
  viewMode: boolean = true;
  createMode: boolean = false;

  constructor(
    private partService: PartService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>  this.loadPart("" + params.get('id'))).subscribe(
        part => {
          this.part = part;
          this.originalPart = JSON.parse(JSON.stringify(part));
        }
      );
  }

  private loadPart(id: string): Promise<Part> {
  return new Promise<Part>(((resolve, reject) => {
    if(id === 'new') {
      this.viewMode = false;
      this.createMode = true;
      resolve(new Part(0,0,0, ""));
    }else{
      this.viewMode = true;
      this.createMode = false;
      this.partService.getPart(id)
        .then(part => {
          resolve(part)
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    }
  }));
  }

  public toggleEdit(){
      this.viewMode = !this.viewMode;
  }

  public save(){
    console.log("Saving");
    this.partService.updatePart(this.part)
      .then((data) => {
        this.originalPart = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.part = JSON.parse(JSON.stringify(this.originalPart));
    this.viewMode = !this.createMode;
  }
  public remove(){
    this.partService.deletePart(this.part)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/part/new');
      });
  }
  public create(){
    this.partService.createPart(this.part)
      .then((data) => {
        this.part = data;
        this.originalPart = JSON.parse(JSON.stringify(data));
        this.viewMode = true;
        this.createMode = false;

        this.router.navigateByUrl('/part/'+ this.part.part_id);
      });
  }


}
