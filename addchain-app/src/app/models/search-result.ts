import {Design} from "../models/design";
import {Build} from "../models/build";
import {Print} from "../models/print";
export class SearchResult {
    designs: Design[];
    builds: Build[];
    prints: Print[];
    constructor(designs, builds, prints){
        this.designs = designs;
        this.builds = builds;
        this.prints = prints;
    }
}
