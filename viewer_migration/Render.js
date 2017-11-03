///<reference path="TSM/tsm-0.7.d.ts"/>
var mat4 = TSM.mat4;
var Render;
(function (Render_1) {
    var Render = (function () {
        function Render() {
            this.mViewMatrix = mat4.identity;
        }
        Render.prototype.onSurfaceCreated = function () {
            this.gl.clearColor(0.149, 0.196, 0.22, 1.0);
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        };
        Render.prototype.onDrawFrame = function () {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            // if (isStl())
            //     for (int i = 0; i < mStlObjectList.size(); i++)
            //         setColor(i);
            this.gl.enable(this.gl.BLEND);
            this.gl.enable(this.gl.DEPTH_TEST);
        };
        return Render;
    }());
    Render_1.Render = Render;
})(Render || (Render = {}));
