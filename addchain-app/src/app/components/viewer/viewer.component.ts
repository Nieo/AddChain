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
  private moveFlag : boolean = false;
  private startPosX: number = 0;
  private startPosY: number = 0;

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

  public mouseWheelDownFunc(event):void{
    // Zoom out
  }
  public mouseWheelUpFunc(event):void{
    // Zoom in
  }
  public mouseDown(event: MouseEvent):void{
    this.moveFlag = true;
    this.startPosX = event.clientX;
    this.startPosY = event.clientY
  }

  public mouseMove(event: MouseEvent):void{
    if(this.moveFlag){
        // Calculate the difference between startPos coordinates and event cordinates rotate accordingly
      let difX:number = this.startPosX - event.clientX;
      let difY:number = this.startPosY - event.clientY;
      console.log("difX =" + difX + " difY=" + difY);
    }
  }

  public mouseUp():void{
    this.moveFlag = false;
    this.startPosX = 0;
    this.startPosY = 0;
  }

  private setUpDataStorage(dataStorage:DataStorage):void {

    //
    // dataStorage.addVertex(1);
    // dataStorage.addVertex(0.2);
    // dataStorage.addVertex(-1);
    //
    // dataStorage.addVertex(1);
    // dataStorage.addVertex(1);
    // dataStorage.addVertex(0);
    //
    //
    // dataStorage.addVertex(0);
    // dataStorage.addVertex(0.5);
    // dataStorage.addVertex(1);
    //
    // dataStorage.addVertex(10);
    // dataStorage.addVertex(0.5);
    // dataStorage.addVertex(11);
    //
    // dataStorage.addVertex(-10);
    // dataStorage.addVertex(-0.5);
    // dataStorage.addVertex(-11);
    //
    //
    //
    //
    // dataStorage.setMaxX(1);
    // dataStorage.setMaxY(1);
    // dataStorage.setMaxZ(1);
    //
    // dataStorage.setMinX(0);
    // dataStorage.setMinY(0);
    // dataStorage.setMinZ(0);
    //
    // dataStorage.addNormal(1);
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(-1);
    //
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(1);
    //
    // dataStorage.addNormal(-1);
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(-1);
    //
    //
    // dataStorage.addNormal(-4);
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(2);
    //
    //
    // dataStorage.addNormal(-7);
    // dataStorage.addNormal(0);
    // dataStorage.addNormal(4);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(0.1);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(-5.0004997);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(-5.0);
    dataStorage.addVertex(10.101001);
    dataStorage.addVertex(5.0005);
    dataStorage.addVertex(5.0);
    dataStorage.addVertex(10.101001);

    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(-1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);
    dataStorage.addNormal(-0.0);
    dataStorage.addNormal(0.0);
    dataStorage.addNormal(1.0);

    dataStorage.setMaxX(5.0005);
    dataStorage.setMaxY(5.0);
    dataStorage.setMaxZ(10.101001);
    dataStorage.setMinX(-5.0004997);
    dataStorage.setMinY(-5.0);
    dataStorage.setMinZ(0.1);

    dataStorage.fillVertexArray(true);
    dataStorage.fillNormalArray();
    dataStorage.centerSTL(true);

  }


}
