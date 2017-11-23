import {Design} from "./design";
import {Build} from "./build";
import {Print} from "./print";
import {Part} from "./part";
import {Project} from "./project";

export class SearchResult {
    projects: Project[];
    designs: Design[];
    builds: Build[];
    prints: Print[];
    parts: Part[];

    constructor(projects, designs, builds, prints, parts){
        this.projects = projects;
        this.designs = designs;
        this.builds = builds;
        this.prints = prints;
        this.parts = parts;
    }
}
