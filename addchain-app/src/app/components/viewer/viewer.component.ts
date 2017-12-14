import { Component, OnInit } from '@angular/core';
import {GLES20} from "./GLES20_Wrapper";
import {ViewerRenderer} from "./ViewerRenderer";
import {DataStorage} from "./DataStorage";

declare var THREE: any;
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

    var w = 400, h = 400;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    var view = document.getElementById("view");
    view.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(45, w / h, 1, 1000);
    camera.position.set(3, 3, 3);
    var controls = new THREE.TrackballControls(camera, view);

    var scene = new THREE.Scene();
    scene.add(new THREE.AmbientLight(0x666666));

    var light1 = new THREE.DirectionalLight(0xffffff);
    light1.position.set(0, 100, 100);
    scene.add(light1);

    var light2 = new THREE.DirectionalLight(0xffffff);
    light2.position.set(0, -100, -100);
    scene.add(light2);

    var mat = new THREE.MeshPhongMaterial({
      color: 0x339900, ambient: 0x339900, specular: 0x030303,
    });
    var obj = new THREE.Mesh(new THREE.Geometry(), mat);
    scene.add(obj);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(this.readyState === 4 && this.status === 200) {
        openFile(xhttp.response);
      }
    };
    xhttp.open("GET", "/assets/stl-reader-3.0.1/test/cube.stl",true);
    xhttp.responseType = "blob";
    xhttp.send();

    var loop = function loop() {
      requestAnimationFrame(loop);
      controls.update();
      renderer.clear();
      renderer.render(scene, camera);
    };
    loop();

    // file load
    var openFile = function (file) {
      console.log("Open file");
      console.log(file);
      var reader = new FileReader();
      reader.addEventListener("load", function (ev: any) {
        var buffer = ev.target.result;
        var geom = loadStl(buffer);
        scene.remove(obj);
        obj = new THREE.Mesh(geom, mat);
        scene.add(obj);
      }, false);
      reader.readAsArrayBuffer(file);
    };



    // let canvas = <HTMLCanvasElement> document.getElementById('stl-viewer');
    //
    // const gl = canvas.getContext("webgl");
    // GLES20.gl = gl;
    //
    // GLES20.glClearColor(0, 1, 1, 1.0);
    // GLES20.glClear(gl.COLOR_BUFFER_BIT);
    // this.viewer.onSurfaceCreated();
    // this.viewer.onSurfaceChanged(canvas.width, canvas.height);
    // this.renderFrame();
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
