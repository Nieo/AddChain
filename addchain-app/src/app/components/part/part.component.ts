import {Component, OnInit} from '@angular/core';
import {Part} from "../../models/part";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {PartService} from "../../services/part.service";
import {Print} from "../../models/print";
import {PrintService} from "../../services/print.service";
import {DatePipe} from "@angular/common";

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
  prints: Print[] = [];
  relatedPrintName: string;

  constructor(
    private partService: PartService,
    private printService: PrintService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>  this.loadPart("" + params.get('id'))).subscribe(
        part => {
          this.part = part;
          this.originalPart = JSON.parse(JSON.stringify(part));
          this.updateRelatedPrint();
        }
      );
    // Gets all potential prints
    this.getPrints();
  }
  getPrints(){
    this.printService.getPrints().subscribe(prints => {
      this.prints = prints;
      this.prints.sort((a: Print, b: Print) => {
        return a.slm_id > b.slm_id ? 1 : -1;
      });
      this.updateRelatedPrint();
    });
  }

  getPrintName(print : number | Print) {
    // TODO: Consider splitting into two separate methods.
    if (typeof print === 'object') {
      // TODO: Locale shouldn't be hardcoded, but for now it makes no actual difference.
      let name: string = new DatePipe('en-US').transform(print.start_time, 'yyyy-MM-dd');
      if (print.operator) {
        name += ' - ' + print.operator;
      }
      name += ' (SLM ' + print.slm_id + ')';
      return name;
    }
    if (typeof print === 'number') {
      let slmId: number = <number> print;
      // TODO: This could be done using binary search.
      for (let print of this.prints) {
        if (print.slm_id === slmId) {
          return this.getPrintName(print);
        }
      }
      return 'SLM ' + slmId;
    }
    return print;
  }

  updateRelatedPrint() {
    this.relatedPrintName = this.getPrintName(this.part.slm_id);
  }

  private loadPart(id: string): Promise<Part> {
  return new Promise<Part>(((resolve, reject) => {
    if(id === 'new') {
      this.viewMode = false;
      this.createMode = true;
      resolve(new Part(0, this.prints.length > 0 ? this.prints[0].slm_id : 0, 0, ""));
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
    this.updateRelatedPrint();
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
