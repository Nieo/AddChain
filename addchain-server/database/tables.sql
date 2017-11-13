/*
*******************************************************************
 Entities
*******************************************************************
*/
CREATE TABLE projects
(
	project_id character varying(20) PRIMARY KEY,
	name character varying(100) NOT NULL,
	customer character varying(100),
	description character varying(500)
);

CREATE TABLE designs
(
	design_id serial PRIMARY KEY,
	name character varying(50),
	description character varying(500),
	stl_file_pointer character varying(100),
	stl_preview character varying(100)
);

CREATE TABLE builds
(
	build_id serial PRIMARY KEY,
	magics_file_pointer character varying(100),
	magics_preview character varying(100),
	material character varying(100),
	comment character varying(500)
);

CREATE TABLE prints
(
	slm_id serial PRIMARY KEY,
	build_id integer REFERENCES builds,
	operator character varying(50),
	start_time timestamp,
	end_time timestamp,
	calculated_print_time integer,
	machine_type character varying(50),
	platform_material character varying(50),
	platform_weight integer,
	powder_start_weight integer,
	powder_end_weight integer,
	powder_waste integer,
	powder_condition character varying(50),
	number_of_layers integer,
	min_exposure_time integer,
	dcp_factor integer,
	base_cutting character varying(100),
	comment character varying(500)
);

CREATE TABLE parts
(
	part_id serial PRIMARY KEY,
	slm_id integer REFERENCES prints NOT NULL,
	part_number integer NOT NULL,
	comment character varying(500)
);

CREATE TABLE post_processes
(
	post_process_id serial PRIMARY KEY,
	name character varying(50) NOT NULL,
	description character varying(500),
	comment character varying(500)
);

/*
*******************************************************************
 Relationships
*******************************************************************
*/

CREATE TABLE orders
(
	project_id character varying(50) REFERENCES projects,
	design_id integer REFERENCES designs,
	quantity integer,
	PRIMARY KEY (design_id)
);

CREATE TABLE prepares
(
	build_id integer REFERENCES builds,
	design_id integer REFERENCES designs,
	part_number integer,
	PRIMARY KEY (build_id, design_id, part_number)
);

CREATE TABLE refinements
(
	part_id integer REFERENCES parts,
	post_process_id integer REFERENCES post_processes,
	PRIMARY KEY (part_id, post_process_id)
);