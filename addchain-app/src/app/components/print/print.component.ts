import { Component, OnInit } from '@angular/core';
import {Print} from "../../models/print";
import {ParamMap, ActivatedRoute, Router} from "@angular/router";
import {PrintService} from "../../services/print.service";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.scss']
})
export class PrintComponent implements OnInit {
  print: Print;
  originalPrint: Print;
  viewMode: boolean = true;
  createMode: boolean = false;
  constructor(
    private printService: PrintService,
    private route: ActivatedRoute,
    private router: Router

  ) {}

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.loadPrint("" + params.get('id'))).subscribe(
      print => {
        this.print = print;
        this.originalPrint = JSON.parse(JSON.stringify(print));
      }
    );

  }

  private loadPrint(id: string):Promise<Print>{
    return new Promise<Print>(((resolve, reject) => {
      if(id === 'new') {
        this.viewMode = false;
        this.createMode = true;
        resolve(new Print(0,1,"","2017-10-27T12:39:02.630Z", "2017-10-27T12:39:02.630Z",0,"","",0,0, 0, 0, "", 0, 0,0, "", ""));
      }else{
        this.viewMode = true;
        this.createMode = false;
        this.printService.getPrint(id)
          .then(print => {
            resolve(print)
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
    this.printService.updatePrint(this.print)
      .then((data) => {
        this.originalPrint = data;
        console.log("Saved data", data);
        this.viewMode = true;
      })
      .catch(err => {
        console.log("Error in updating. Inform the user somehow", err);
      });
  }
  public reset(){
    this.print = JSON.parse(JSON.stringify(this.originalPrint));
    this.viewMode = this.createMode? false: true;
  }
  public remove(){
    this.printService.deletePrint(this.print)
      .then((data) => {
        console.log("deleted ", data);
        this.router.navigateByUrl('/print/new');
      });
  }
  public create(){
    this.printService.createPrint(this.print)
      .then((data) => {
        this.print = data;
        this.originalPrint = JSON.parse(JSON.stringify(data));
        this.viewMode = true;
        this.createMode = false;

        this.router.navigateByUrl('/print/'+ this.print.slm_id);
      });
  }
}
