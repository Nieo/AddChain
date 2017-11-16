export class Design {
  design_id: number;
  name: string;
  description: string;
  relatedBuilds: RelatedBuild[];
  relatedProject: RelatedProject[];
  constructor(design_id: number, name: string, description: string, relatedBuilds: RelatedBuild[]){
    this.design_id = design_id;
    this.name = name;
    this.description = description;
    this.relatedBuilds = relatedBuilds;
  }
}

export class RelatedBuild {
  build_id: number;
  count: number;
  constructor(build_id:number, count:number){
    this.build_id = build_id;
    this.count = count;
  }
}

export class RelatedProject {
  project_id: string;
  name: string;
}
