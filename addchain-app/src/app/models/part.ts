export class Part{
  part_id: number;
  part_number: number;
  slm_id: number;
  comment: string;
  relatedPostProcesses: RelatedPostProcesses[] = [];

  constructor(part_id: number, slm_id: number,part_number: number, comment: string) {
    this.part_id = part_id;
    this.slm_id = slm_id;
    this.part_number = part_number;
    this.comment = comment;
  }
}

export class RelatedPostProcesses {
  post_process_id: number;
  name: string;
  description: string;
  comment: string;
}
