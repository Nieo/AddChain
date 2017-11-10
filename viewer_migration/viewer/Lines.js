"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var ViewerRenderer_1 = require("./ViewerRenderer");
var GLES20_Wrapper_1 = require("./GLES20_Wrapper");
var Lines = (function () {
    function Lines() {
        this.vertexShaderCode = "uniform mat4 uMVPMatrix;" + "attribute vec4 vPosition;" + "void main() {" +
            "  gl_Position = uMVPMatrix * vPosition;" + "}";
        this.fragmentShaderCode = "precision mediump float;" + "uniform vec4 vColor;" + "void main() {" + "  gl_FragColor = vColor;" + "}";
        this.COORDS_PER_VERTEX = 3;
        this.lineCoords = function (d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(6);
        this.vertexStride = this.COORDS_PER_VERTEX * 4;
        this.drawOrder = [
            0,
            1,
            2,
            0,
            2,
            3
        ];
        this.lineCoords[0] = 0.0;
        this.lineCoords[1] = 0.0;
        this.lineCoords[2] = 0.0;
        this.lineCoords[3] = 0.0;
        this.lineCoords[4] = 0.0;
        this.lineCoords[5] = 0.0;
        this.mCoordsArray = this.lineCoords;
        this.vertexCount = this.mCoordsArray.length / this.COORDS_PER_VERTEX;
        var bb = new ArrayBuffer(this.mCoordsArray.length * 4);
        // bb.order(ByteOrder.nativeOrder());
        this.mVertexBuffer = new Float32Array(bb);
        var dlb = new ArrayBuffer(this.drawOrder.length * 2);
        // dlb.order(ByteOrder.nativeOrder());
        this.mDrawListBuffer = dlb.asShortBuffer();
        this.mDrawListBuffer.put(this.drawOrder);
        this.mDrawListBuffer.position(0);
        var vertexShader = ViewerRenderer_1.ViewerRenderer.loadShader(GLES20_Wrapper_1.GLES20.GL_VERTEX_SHADER, this.vertexShaderCode);
        var fragmentShader = ViewerRenderer_1.ViewerRenderer.loadShader(GLES20_Wrapper_1.GLES20.GL_FRAGMENT_SHADER, this.fragmentShaderCode);
        this.mProgram = GLES20_Wrapper_1.GLES20.glCreateProgram();
        GLES20_Wrapper_1.GLES20.glAttachShader(this.mProgram, vertexShader);
        GLES20_Wrapper_1.GLES20.glAttachShader(this.mProgram, fragmentShader);
        GLES20_Wrapper_1.GLES20.glLinkProgram(this.mProgram);
    }
    Lines.prototype.drawXAxis = function (point, z) {
        var tempAxis = function (d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x - 100;
        tempAxis[1] = point.y;
        tempAxis[2] = z;
        tempAxis[3] = point.x + 100;
        tempAxis[4] = point.y;
        tempAxis[5] = z;
        return tempAxis;
    };
    Lines.prototype.drawYAxis = function (point, z) {
        var tempAxis = function (d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x;
        tempAxis[1] = point.y - 100;
        tempAxis[2] = z;
        tempAxis[3] = point.x;
        tempAxis[4] = point.y + 100;
        tempAxis[5] = z;
        return tempAxis;
    };
    Lines.prototype.drawZAxis = function (point, z) {
        var tempAxis = function (d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x;
        tempAxis[1] = point.y;
        tempAxis[2] = z - 100;
        tempAxis[3] = point.x;
        tempAxis[4] = point.y;
        tempAxis[5] = z + 100;
        return tempAxis;
    };
    Lines.prototype.draw = function (data, mvpMatrix, currentAxis) {
        GLES20_Wrapper_1.GLES20.glUseProgram(this.mProgram);
        GLES20_Wrapper_1.GLES20.glBlendFunc(GLES20_Wrapper_1.GLES20.GL_ONE, GLES20_Wrapper_1.GLES20.GL_ONE_MINUS_SRC_ALPHA);
        this.mPositionHandle = GLES20_Wrapper_1.GLES20.glGetAttribLocation(this.mProgram, "vPosition");
        GLES20_Wrapper_1.GLES20.glEnableVertexAttribArray(this.mPositionHandle);
        switch (currentAxis) {
            case Lines.X_AXIS:
                this.mCoordsArray = this.drawXAxis(data.getLastCenter(), data.getTrueCenter().z);
                this.mCurrentColor = Lines.X_COLOR;
                break;
            case Lines.Y_AXIS:
                this.mCoordsArray = this.drawYAxis(data.getLastCenter(), data.getTrueCenter().z);
                this.mCurrentColor = Lines.Y_COLOR;
                break;
            case Lines.Z_AXIS:
                this.mCoordsArray = this.drawZAxis(data.getLastCenter(), data.getTrueCenter().z);
                this.mCurrentColor = Lines.Z_COLOR;
                break;
            default:
                this.mCoordsArray = null;
                break;
        }
        if (this.mCoordsArray != null) {
            this.mVertexBuffer.put(this.mCoordsArray);
            this.mVertexBuffer.position(0);
            GLES20_Wrapper_1.GLES20.glVertexAttribPointer(this.mPositionHandle, this.COORDS_PER_VERTEX, GLES20_Wrapper_1.GLES20.GL_FLOAT, false, this.vertexStride, this.mVertexBuffer);
            this.mColorHandle = GLES20_Wrapper_1.GLES20.glGetUniformLocation(this.mProgram, "vColor");
            GLES20_Wrapper_1.GLES20.glUniform4fv(this.mColorHandle, this.mCurrentColor);
            this.mMVPMatrixHandle = GLES20_Wrapper_1.GLES20.glGetUniformLocation(this.mProgram, "uMVPMatrix");
            ViewerRenderer_1.ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20_Wrapper_1.GLES20.glUniformMatrix4fv(this.mMVPMatrixHandle, 1, false, mvpMatrix, 0);
            ViewerRenderer_1.ViewerRenderer.checkGlError("glUniformMatrix4fv");
            GLES20_Wrapper_1.GLES20.glDrawArrays(GLES20_Wrapper_1.GLES20.GL_LINES, 0, this.vertexCount);
            var points = function (d) {
                // new float[20]
                // TODO: Consider refactoring this array initialization to be more readable.
                var r = [];
                for (var i_1 = 0; i_1 < d; i_1++)
                    r.push(0);
                return r;
            }(20);
            var i = 0;
            var radius = 0.75;
            for (var angle = 0; angle < 2 * Math.PI; angle = 0.630) {
                points[i] = radius * Math.cos(angle);
                points[i] = radius * Math.sin(angle);
                i++;
            }
            GLES20_Wrapper_1.GLES20.glDrawArrays(GLES20_Wrapper_1.GLES20.GL_POINTS, 0, this.vertexCount);
            GLES20_Wrapper_1.GLES20.glDisableVertexAttribArray(this.mPositionHandle);
        }
    };
    return Lines;
}());
Lines.X_AXIS = 0;
Lines.Y_AXIS = 1;
Lines.Z_AXIS = 2;
Lines.TRANSPARENCY = 0.5;
Lines.X_COLOR = [
    0.0,
    0.9,
    0.0,
    Lines.TRANSPARENCY
];
Lines.Y_COLOR = [
    1.0,
    0.0,
    0.0,
    Lines.TRANSPARENCY
];
Lines.Z_COLOR = [
    0.0,
    0.0,
    1.0,
    Lines.TRANSPARENCY
];
exports.Lines = Lines;
