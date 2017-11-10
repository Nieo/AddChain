import { Component, OnInit } from '@angular/core';
import {GLES20} from "./GLES20_Wrapper";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let canvas = <HTMLCanvasElement> document.getElementById('stl-viewer');
    let gl = this.setupWebGL(canvas);

    GLES20.glClearColor(1, 1, 1, 1.0);
    GLES20.glClear(gl.COLOR_BUFFER_BIT);
  }

  private setupWebGL(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("experimental-webgl", {});
    GLES20.gl = gl;
    return gl;
  }
}
