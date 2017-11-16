export class Project {
  project_id: string;
  name: string;
  customer: string;
  description: string;
  relatedDesigns: RelatedDesign[] = [];
  constructor(project_id: string, name: string, customer: string, description: string){
    this.project_id = project_id;
    this.name = name;
    this.customer = customer;
    this.description = description;
  }
}

export class RelatedDesign{
  design_id: number;
  name: string;
  quantity: number;
}
