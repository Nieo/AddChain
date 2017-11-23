import {Design} from "./design";
import {Build} from "./build";
import {Print} from "./print";
import {Part} from "./part";

export class SearchResult {
    designs: Design[];
    builds: Build[];
    prints: Print[];
    parts: Part[];

    constructor(designs, builds, prints, parts){
        this.designs = designs;
        this.builds = builds;
        this.prints = prints;
        this.parts = parts;
    }
}
