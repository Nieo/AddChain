import * as StlReader from './../../../assets/stl-reader-3.0.1';
//import fs from 'fs';
declare function require(name: string);

export class StlLoader {
  private reader: FileReader;
  // private fs = require('fs');

  constructor() {
    this.reader = new FileReader();
    this.reader.onload = function () {
      let stlReader, data;

      data = this.result;
      stlReader = new StlReader();
      let res = stlReader.read(data);

      console.log(res.vn);
      console.log(res.vertices);
      console.log(res.normals);
    };

  }

  public loadFile(path: string) {
    // this.fs.readFile(path,function(err, data) {
    //   if (err) throw err;
    //   this.reader.readAsArrayBuffer(data);
    // });
  }

  public loadTestFile() {
    this.loadFile('./../../../assets/stl-reader-3.0.1/test/cube.stl');
  }
}
