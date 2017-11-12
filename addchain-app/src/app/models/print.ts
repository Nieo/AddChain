export class Print {
  slm_id: number;
  build_id: number;
  operator: string;
  start_time: any;
  end_time: any;
  calculated_print_time: number;
  machine_type: string;
  platform_material: string;
  platform_weight: number;
  platform_start_weight: number;
  constructor(slm_id, build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, platform_start_weight){
    this.slm_id = slm_id;
    this.build_id = build_id;
    this.operator = operator;
    this.start_time = start_time;
    this.end_time = end_time;
    this.calculated_print_time = calculated_print_time;
    this.machine_type = machine_type;
    this.platform_material = platform_material;
    this.platform_weight = platform_weight;
    this.platform_start_weight;
  }
}
