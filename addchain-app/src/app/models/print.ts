export class Print {
  slm_id: number;
  build_id: number;
  operator: string;
  start_time: Date;
  end_time: Date;
  calculated_print_time: number;
  machine_type: string;
  platform_material: string;
  platform_weight: number;
  powder_start_weight: number;
  powder_end_weight: number;
  powder_waste: number;
  powder_condition:string;
  number_of_layers: number;
  min_exposure_time: number;
  dcp_factor: number;
  base_cutting: string;
  comment: string;



  constructor(slm_id, build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight,
    powder_end_weight, powder_waste,powder_condition, number_of_layers, min_exposure_time , dcp_factor , base_cutting, comment){
    this.slm_id = slm_id;
    this.build_id = build_id;
    this.operator = operator;
    this.start_time = start_time;
    this.end_time = end_time;
    this.calculated_print_time = calculated_print_time;
    this.machine_type = machine_type;
    this.platform_material = platform_material;
    this.platform_weight = platform_weight;
    this.powder_start_weight = powder_start_weight;
    this.powder_end_weight = powder_end_weight;
    this.powder_waste = powder_waste;
    this.powder_condition = powder_condition;
    this.number_of_layers = number_of_layers;
    this.min_exposure_time = min_exposure_time;
    this.dcp_factor = dcp_factor;
    this.base_cutting = base_cutting;
    this.comment = comment;


  }
}
