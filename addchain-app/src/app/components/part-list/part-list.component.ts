import {Component, OnDestroy, OnInit} from '@angular/core';
import {Part} from "../../models/part";
import {PartService} from "../../services/part.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-part-list',
  templateUrl: './part-list.component.html',
  styleUrls: ['./part-list.component.scss']
})
export class PartListComponent implements OnInit, OnDestroy {
  parts: Part[];
  currentPartID: number;
  sub: any;
  constructor(private partService: PartService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getParts();
      this.currentPartID = +params['id'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getParts(){
    this.partService.getParts().subscribe(parts => {
      this.parts = parts;
      this.parts.sort((a:Part, b:Part) => {
        return a.part_id > b.part_id ? 1: -1;
      })
    });
  }

}
