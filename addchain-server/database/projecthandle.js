const db = require('./db');

exports.getProjectList = (page) => {return db.any('SELECT * FROM projects LIMIT 100 OFFSET $1', [page]);};
exports.getProject = (id) => {return db.one('SELECT * FROM projects WHERE project_id = $1', id);};
exports.createProject = (project) => {return db.one('INSERT INTO projects (project_id, name, customer, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [project.project_id, project.name, project.customer, project.description]);};
exports.updateProject = (project) => {return db.one('UPDATE projects SET name=$2, customer=$3, description=$4 WHERE project_id=$1 RETURNING *',
        [project.id, project.name, project.customer, project.description]);};
exports.deleteProject = (id) => {return db.result('DELETE FROM projects WHERE project_id=$1', [id], r => r.rowCount);};
exports.getRelatedDesigns = (id) => {
    return db.any('SELECT orders.design_id, designs.name, orders.quantity' +
        ' FROM orders INNER JOIN designs ON orders.design_id = designs.design_id' +
        ' WHERE orders.project_id=$1',[id]);
};