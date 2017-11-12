import { Component, OnInit } from '@angular/core';
import {Print} from "../../models/print";
import {PrintService} from "../../services/print.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-print-list',
  templateUrl: './print-list.component.html',
  styleUrls: ['./print-list.component.scss']
})
export class PrintListComponent implements OnInit {
  prints: Print[];
  currentPrintID : number;
  sub: any;
  constructor(
    private printService: PrintService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getPrints();
      this.currentPrintID = +params['id'];
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  getPrints(){
    this.printService.getPrints().subscribe(prints => {
      this.prints = prints;
      this.prints.sort((a: Print, b: Print) => {
        return a.slm_id > b.slm_id ? 1 : -1;
      });
    });
  }

}
