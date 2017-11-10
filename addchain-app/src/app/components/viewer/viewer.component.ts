import { Component, OnInit } from '@angular/core';
import {GLES20} from "./GLES20_Wrapper";
import {ViewerRenderer} from "./ViewerRenderer";
import {DataStorage} from "./DataStorage";

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements OnInit {
  private viewer: ViewerRenderer;

  constructor() {
    this.viewer = new ViewerRenderer( [new DataStorage()],0,0);
  }

  ngOnInit() {
    let canvas = <HTMLCanvasElement> document.getElementById('stl-viewer');
    let gl = this.setupWebGL(canvas);

    GLES20.glClearColor(0, 1, 1, 1.0);
    GLES20.glClear(gl.COLOR_BUFFER_BIT);
    this.viewer.onSurfaceCreated();
    this.renderFrame();

  }

  private renderFrame():void {
    this.viewer.onDrawFrame();
    window.requestAnimationFrame(time => this.renderFrame());
  }



  private setupWebGL(canvas: HTMLCanvasElement) {
    let gl = canvas.getContext("experimental-webgl", {});
    GLES20.gl = gl;
    return gl;
  }
}
