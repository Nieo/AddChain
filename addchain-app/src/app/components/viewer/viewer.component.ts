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
    let dataStorage = new DataStorage();
    this.setUpDataStorage(dataStorage);
    this.viewer = new ViewerRenderer( [dataStorage],0,1);
  }

  ngOnInit() {

    let canvas = <HTMLCanvasElement> document.getElementById('stl-viewer');

    const gl = canvas.getContext("webgl");
    GLES20.gl = gl;

    GLES20.glClearColor(0, 1, 1, 1.0);
    GLES20.glClear(gl.COLOR_BUFFER_BIT);
    this.viewer.onSurfaceCreated();
    this.viewer.onSurfaceChanged(canvas.width, canvas.height);
    this.renderFrame();

  }

  private renderFrame():void {
    this.viewer.onDrawFrame();
    window.requestAnimationFrame(time => this.renderFrame());
  }

  private setUpDataStorage(dataStorage:DataStorage):void {


    dataStorage.addVertex(1);
    dataStorage.addVertex(0.2);
    dataStorage.addVertex(-1);

    dataStorage.addVertex(1);
    dataStorage.addVertex(1);
    dataStorage.addVertex(0);

    dataStorage.addVertex(0);
    dataStorage.addVertex(0.5);
    dataStorage.addVertex(1);


    dataStorage.setMaxX(1);
    dataStorage.setMaxY(1);
    dataStorage.setMaxZ(1);

    dataStorage.setMinX(0);
    dataStorage.setMinY(0);
    dataStorage.setMinZ(0);

    dataStorage.addNormal(1);
    dataStorage.addNormal(0);
    dataStorage.addNormal(-1);

    dataStorage.addNormal(0);
    dataStorage.addNormal(0);
    dataStorage.addNormal(1);

    dataStorage.addNormal(-1);
    dataStorage.addNormal(0);
    dataStorage.addNormal(-1);

    dataStorage.fillVertexArray(true);
    dataStorage.fillNormalArray();
    dataStorage.centerSTL(true);

  }


}
