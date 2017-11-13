-- Projects
insert into projects(project_id, name, customer, description) values ('Tremiljarder 10','Stoolmaking', 'Boogie2988', 'Make me a god-damn stool!');
insert into projects(project_id, name, customer, description) values ('abc123','Maths', 'Volvo cars', 'Counting with variables');

-- Designs
insert into designs (name, description, stl_file_pointer, stl_preview) values ('Leg', 'The leg of a stool', 'root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want');
insert into designs (name, description, stl_file_pointer, stl_preview) values ('Seat', 'The seat of a stool', 'root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want');
insert into designs (name, description, stl_file_pointer, stl_preview) values ('Body', 'Body of a car', 'root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want');
insert into designs (name, description, stl_file_pointer, stl_preview) values ('Stearing wheel', 'Something round-ish', 'root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want');

-- Orders
insert into orders (project_id, design_id, quantity) values ('Tremiljarder 10', 1, 4);
insert into orders (project_id, design_id, quantity) values ('Tremiljarder 10', 2, 1);
insert into orders (project_id, design_id, quantity) values ('abc123', 3, 2);
insert into orders (project_id, design_id, quantity) values ('abc123', 4, 5000);

-- Builds
insert into builds (magics_file_pointer, magics_preview, material, comment) values ('root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want', 'metal A', 'Printing all parts of the stool in one go');
insert into builds (magics_file_pointer, magics_preview, material, comment) values ('root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want', 'metal B', 'Apparently he was not happy with the kind of metal used...');
insert into builds (magics_file_pointer, magics_preview, material, comment) values ('root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want', 'metal C', 'Only one body fit at a time');
insert into builds (magics_file_pointer, magics_preview, material, comment) values ('root/sub-root/into-infinity/the-file-you-want', 'root/sub-root/into-infinity/the-file-you-want', 'metal C', 'I am still surprised we fit 2500 stearing wheels in one print');

-- Prepares
insert into prepares (build_id, design_id, part_number) values (1, 1, 1);
insert into prepares (build_id, design_id, part_number) values (1, 1, 2);
insert into prepares (build_id, design_id, part_number) values (1, 1, 3);
insert into prepares (build_id, design_id, part_number) values (1, 1, 4);
insert into prepares (build_id, design_id, part_number) values (1, 2, 5);
insert into prepares (build_id, design_id, part_number) values (2, 1, 1);
insert into prepares (build_id, design_id, part_number) values (2, 1, 2);
insert into prepares (build_id, design_id, part_number) values (2, 1, 3);
insert into prepares (build_id, design_id, part_number) values (2, 1, 4);
insert into prepares (build_id, design_id, part_number) values (2, 2, 5);
insert into prepares (build_id, design_id, part_number) values (3, 3, 1);
insert into prepares (build_id, design_id, part_number) values (4, 4, 1);
insert into prepares (build_id, design_id, part_number) values (4, 4, 2500);

-- Prints
insert into prints (build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight, powder_end_weight, powder_waste, powder_condition, number_of_layers, min_exposure_time, dcp_factor, base_cutting, comment)
	values (1, 'Kalle Persson', now(), (now() + interval '5 hours'), 48000, 'SLM 128', 'material D', 900, 2000, 1400, 200, 'New', 800, 7, 11234, 'Saw', 'A lot of waste on this one');
insert into prints (build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight, powder_end_weight, powder_waste, powder_condition, number_of_layers, min_exposure_time, dcp_factor, base_cutting, comment)
	values (2, 'Kalle Persson', now(), (now() + interval '5 hours'), 48000, 'SLM 128', 'material D', 900, 2100, 1500, 200, 'New', 800, 7, 11234, 'Saw', 'Take two');
insert into prints (build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight, powder_end_weight, powder_waste, powder_condition, number_of_layers, min_exposure_time, dcp_factor, base_cutting, comment)
	values (3, 'Björn Borg', now(), (now() + interval '10 hours'), 98000, 'SLM 128', 'material D', 1000, 3000, 1400, 200, 'Mixed', 800, 7, 11234, 'Saw', 'No comment');
insert into prints (build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight, powder_end_weight, powder_waste, powder_condition, number_of_layers, min_exposure_time, dcp_factor, base_cutting, comment)
	values (4, 'Pål Jönsson', now(), (now() + interval '6 hours'), 55000, 'SLM 256', 'material D', 1200, 4000, 400, 400, 'New', 800, 7, 11234, 'Manually removed', 'I have a comment');
insert into prints (build_id, operator, start_time, end_time, calculated_print_time, machine_type, platform_material, platform_weight, powder_start_weight, powder_end_weight, powder_waste, powder_condition, number_of_layers, min_exposure_time, dcp_factor, base_cutting, comment)
	values (4, 'Pål Jönsson', now(), (now() + interval '7 hours'), 55000, 'SLM 256', 'material D', 1200, 4000, 400, 400, 'Reused 1 time', 800, 7, 11234, 'Manually removed', 'My hands are tired');

-- Parts
insert into parts (slm_id, part_number, comment) values (1, 1, '');
insert into parts (slm_id, part_number, comment) values (1, 2, '');
insert into parts (slm_id, part_number, comment) values (1, 3, '');
insert into parts (slm_id, part_number, comment) values (1, 4, 'Small visual imperfection');
insert into parts (slm_id, part_number, comment) values (1, 5, '');
insert into parts (slm_id, part_number, comment) values (2, 1, '');
insert into parts (slm_id, part_number, comment) values (2, 2, '');
insert into parts (slm_id, part_number, comment) values (2, 3, '');
insert into parts (slm_id, part_number, comment) values (2, 4, '');
insert into parts (slm_id, part_number, comment) values (2, 5, 'Perfection objectified');
insert into parts (slm_id, part_number, comment) values (3, 1, '');
insert into parts (slm_id, part_number, comment) values (4, 1, '');
insert into parts (slm_id, part_number, comment) values (4, 2500, '');
insert into parts (slm_id, part_number, comment) values (5, 1, 'This manifested a perfect set of devil horns during the printing process');
insert into parts (slm_id, part_number, comment) values (5, 2500, '');

-- Post-processes
insert into post_processes (name, description, comment) values ('Normal heat treatment', 'Heat the stuff up to a certain temerature', 'No problems');
insert into post_processes (name, description, comment) values ('Normal heat treatment', 'Heat the stuff up to a certain temerature', 'No problems');
insert into post_processes (name, description, comment) values ('Blasting', 'Manually sandblast imperfections away', '');
insert into post_processes (name, description, comment) values ('Super hot heat treatment', 'Heat the stuff up over 9000 degrees!!!', 'No problems');
insert into post_processes (name, description, comment) values ('Super hot heat treatment', 'Heat the stuff up over 9000 degrees!!!', 'Oops, don''t tell anyone');

-- Refinements
insert into refinements (part_id, post_process_id) values (1, 1);
insert into refinements (part_id, post_process_id) values (2, 1);
insert into refinements (part_id, post_process_id) values (3, 1);
insert into refinements (part_id, post_process_id) values (4, 1);
insert into refinements (part_id, post_process_id) values (5, 1);
insert into refinements (part_id, post_process_id) values (6, 2);
insert into refinements (part_id, post_process_id) values (7, 2);
insert into refinements (part_id, post_process_id) values (8, 2);
insert into refinements (part_id, post_process_id) values (9, 2);
insert into refinements (part_id, post_process_id) values (10, 2);
insert into refinements (part_id, post_process_id) values (6, 3);
insert into refinements (part_id, post_process_id) values (7, 3);
insert into refinements (part_id, post_process_id) values (8, 3);
insert into refinements (part_id, post_process_id) values (9, 3);
insert into refinements (part_id, post_process_id) values (10, 3);
insert into refinements (part_id, post_process_id) values (11, 3);
insert into refinements (part_id, post_process_id) values (12, 4);
insert into refinements (part_id, post_process_id) values (13, 4);
insert into refinements (part_id, post_process_id) values (14, 5);
insert into refinements (part_id, post_process_id) values (15, 5);