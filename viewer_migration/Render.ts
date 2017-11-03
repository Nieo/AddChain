///<reference path="TSM/tsm-0.7.d.ts"/>
import mat4 = TSM.mat4;
module Render {
    export class Render {
        ///<reference path="webgl.d.ts" />
        public gl: WebGLRenderingContext;
        public mViewMatrix: mat4 = mat4.identity;
        
        constructor() {
        }

        public onSurfaceCreated(): void {
            this.gl.clearColor(0.149, 0.196, 0.22, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        }

        public onDrawFrame(): void {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

            // if (isStl())
            //     for (int i = 0; i < mStlObjectList.size(); i++)
            //         setColor(i);

            this.gl.enable(this.gl.BLEND);
            this.gl.enable(this.gl.DEPTH_TEST);

        }
    }
}

