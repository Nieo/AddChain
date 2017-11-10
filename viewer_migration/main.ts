import {GLES20} from "./viewer/GLES20_Wrapper";
import {ViewerRenderer} from "./viewer/ViewerRenderer";
function init() {
    let canvas = <HTMLCanvasElement> document.getElementById('canvas');
    GLES20.gl = canvas.getContext("experimental-webgl", {});
    let renderer: ViewerRenderer = new ViewerRenderer(null,0,0);
}

init();