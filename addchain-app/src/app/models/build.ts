export class Build {
  build_id: number;
  material: string;
  comment: string;
  constructor(build_id: number, material: string, comment: string){
    this.build_id = build_id;
    this.material = material;
    this.comment = comment;
  }
}
