import {Render} from './Render'

window.onload = () => {
    let render =  new render.render();
    let canvas = <HTMLCanvasElement> document.createElement("canvas");
    document.body.appendChild(canvas);

    render.gl = canvas.getContext("experimental-webgl", {});
    render.onSurfaceCreated();
    render.onDrawFrame()
};
