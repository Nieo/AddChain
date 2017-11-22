import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
      private router: Router
      ) { }
  
  public onEnter(query){
       this.router.navigateByUrl("search/" + encodeURIComponent(query));
  }
  ngOnInit() {
  }

}
