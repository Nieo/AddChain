const db = require('./db');

exports.getPrintList = (page) => {return db.any('SELECT * FROM prints LIMIT 100 OFFSET $1', [page]);};
exports.getPrint = (id) => {return db.one('SELECT * FROM prints WHERE slm_id = $1', id);};
exports.getPrintIfExists = (id) => {return db.oneOrNone('SELECT * FROM prints WHERE slm_id = $1', id);};
exports.createPrint = (print) => {
  return db.one(
    'INSERT INTO prints(' +
    'build_id,' +
    'operator,' +
    'start_time,' +
    'end_time,' +
    'calculated_print_time,' +
    'machine_type,' +
    'platform_material,' +
    'platform_weight,' +
    'powder_start_weight,' +
    'powder_end_weight,' +
    'powder_waste,' +
    'powder_condition,' +
    'number_of_layers,' +
    'min_exposure_time,' +
    'dcp_factor,' +
    'base_cutting,' +
    'comment' +
    ') VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *',
    asArray(print));};
exports.updatePrint = (print) => {
  return db.one('UPDATE prints SET ' +
  'build_id=$2,' +
  'operator=$3,' +
  'start_time=$4,' +
  'end_time=$5,' +
  'calculated_print_time=$6,' +
  'machine_type=$7,' +
  'platform_material=$8,' +
  'platform_weight=$9,' +
  'powder_start_weight=$10,' +
  'powder_end_weight=$11,' +
  'powder_waste=$12,' +
  'powder_condition=$13,' +
  'number_of_layers=$14,' +
  'min_exposure_time=$15,' +
  'dcp_factor=$16,' +
  'base_cutting=$17,' +
  'comment=$18' +
  ' WHERE slm_id=$1 RETURNING *', [print.id].concat(asArray(print)));};
exports.deletePrint = (id) => {return db.result('DELETE FROM prints WHERE slm_id=$1', [id], r => r.rowCount);};

/**
 * Creates an array of all object properties that can be used as input to SQL queries
 */
function asArray(print) {
  return [print.build_id,
    print.operator,
    print.start_time,
    print.end_time,
    print.calculated_print_time,
    print.machine_type,
    print.platform_material,
    print.platform_weight,
    print.powder_start_weight,
    print.powder_end_weight,
    print.powder_waste,
    print.powder_condition,
    print.number_of_layers,
    print.min_exposure_time,
    print.dcp_factor,
    print.base_cutting,
    print.comment]
}