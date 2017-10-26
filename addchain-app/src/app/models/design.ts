export class Design {
  design_id: number;
  name: string;
  description: string;
  constructor(design_id: number, name: string, description: string){
    this.design_id = design_id;
    this.name = name;
    this.description = description;
  }
}
