export class Build {
  build_id: number;
  material: string;
  comment: string;
  relatedDesigns: RelatedDesign[] = [];
  relatedPrints: RelatedPrint[] = [];
  constructor(build_id: number, material: string, comment: string){
    this.build_id = build_id;
    this.material = material;
    this.comment = comment;
  }
}

export class RelatedDesign{
  design_id: number;
  copies: number;
  name: string;
}

export class RelatedPrint{
  slm_id: number;
  start_time: Date;
}
