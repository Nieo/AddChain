// package android.app.printerapp.viewer;

import {ViewerRenderer} from "./ViewerRenderer";
import {Point} from "./Geometry";
import {DataStorage} from "./DataStorage";
import {GLES20} from "./GLES20_Wrapper";

export class Lines {
    private readonly vertexShaderCode: string = "uniform mat4 uMVPMatrix;" + "attribute vec4 vPosition;" + "void main() {" + // for the matrix multiplication product to be correct.
    "  gl_Position = uMVPMatrix * vPosition;" + "}";

    private readonly fragmentShaderCode: string = "precision mediump float;" + "uniform vec4 vColor;" + "void main() {" + "  gl_FragColor = vColor;" + "}";

    public static readonly X_AXIS: number = 0;

    public static readonly Y_AXIS: number = 1;

    public static readonly Z_AXIS: number = 2;

    private static readonly TRANSPARENCY: number = 0.5;

    private static readonly X_COLOR: number[] = [
        0.0,
        0.9,
        0.0,
        Lines.TRANSPARENCY
    ];

    private static readonly Y_COLOR: number[] = [
        1.0,
        0.0,
        0.0,
        Lines.TRANSPARENCY
    ];

    private static readonly Z_COLOR: number[] = [
        0.0,
        0.0,
        1.0,
        Lines.TRANSPARENCY
    ];

    readonly mVertexBuffer: Float32Array;

    private readonly mDrawListBuffer: Float32Array;

    readonly mProgram: number;

    mPositionHandle: number;

    mColorHandle: number;

    mCoordsArray: number[];

    mCurrentColor: number[];

    private mMVPMatrixHandle: number;

    readonly COORDS_PER_VERTEX: number = 3;

    lineCoords: number[] = function(d) {
        // new float[6]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(6);

    vertexCount: number;

    vertexStride: number = this.COORDS_PER_VERTEX * 4;

    private readonly drawOrder: number[] = [
        0,
        1,
        2,
        0,
        2,
        3
    ];

    public constructor() {
        this.lineCoords[0] = 0.0;
        this.lineCoords[1] = 0.0;
        this.lineCoords[2] = 0.0;
        this.lineCoords[3] = 0.0;
        this.lineCoords[4] = 0.0;
        this.lineCoords[5] = 0.0;
        this.mCoordsArray = this.lineCoords;
        this.vertexCount = this.mCoordsArray.length / this.COORDS_PER_VERTEX;
        let bb: ArrayBuffer = new ArrayBuffer(this.mCoordsArray.length * 4);
        // bb.order(ByteOrder.nativeOrder());
        this.mVertexBuffer = new Float32Array(bb);
        let dlb: ArrayBuffer = new ArrayBuffer(this.drawOrder.length * 2);
        // dlb.order(ByteOrder.nativeOrder());
        this.mDrawListBuffer = dlb.asShortBuffer();
        this.mDrawListBuffer.put(this.drawOrder);
        this.mDrawListBuffer.position(0);
        let vertexShader: number = ViewerRenderer.loadShader(
            GLES20.GL_VERTEX_SHADER,
            this.vertexShaderCode
        );
        let fragmentShader: number = ViewerRenderer.loadShader(
            GLES20.GL_FRAGMENT_SHADER,
            this.fragmentShaderCode
        );
        this.mProgram = GLES20.glCreateProgram();
        GLES20.glAttachShader(
            this.mProgram,
            vertexShader
        );
        GLES20.glAttachShader(
            this.mProgram,
            fragmentShader
        );
        GLES20.glLinkProgram(this.mProgram);
    }

    private drawXAxis(
            point: Point,
            z: number) : number[] {
        let tempAxis: number[] = function(d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x - 100;
        tempAxis[1] = point.y;
        tempAxis[2] = z;
        tempAxis[3] = point.x + 100;
        tempAxis[4] = point.y;
        tempAxis[5] = z;
        return tempAxis;
    }

    private drawYAxis(
            point: 
                // TODO: Warning - type not found in scope.
            Point,
            z: number) : number[] {
        let tempAxis: number[] = function(d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x;
        tempAxis[1] = point.y - 100;
        tempAxis[2] = z;
        tempAxis[3] = point.x;
        tempAxis[4] = point.y + 100;
        tempAxis[5] = z;
        return tempAxis;
    }

    private drawZAxis(point: Point, z: number) : number[] {
        let tempAxis: number[] = function(d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(6);
        tempAxis[0] = point.x;
        tempAxis[1] = point.y;
        tempAxis[2] = z - 100;
        tempAxis[3] = point.x;
        tempAxis[4] = point.y;
        tempAxis[5] = z + 100;
        return tempAxis;
    }

    public draw(
            data: DataStorage,
            mvpMatrix: number[],
            currentAxis: number) : void {
        GLES20.glUseProgram(this.mProgram);
        GLES20.glBlendFunc(
            GLES20.GL_ONE,
            GLES20.GL_ONE_MINUS_SRC_ALPHA
        );
        this.mPositionHandle = GLES20.glGetAttribLocation(
            this.mProgram,
            "vPosition"
        );
        GLES20.glEnableVertexAttribArray(this.mPositionHandle);
        switch (currentAxis) {
            case Lines.X_AXIS:
                this.mCoordsArray = this.drawXAxis(
                    data.getLastCenter(),
                    data.getTrueCenter().z
                );
                this.mCurrentColor = Lines.X_COLOR;
                break;
            case Lines.Y_AXIS:
                this.mCoordsArray = this.drawYAxis(
                    data.getLastCenter(),
                    data.getTrueCenter().z
                );
                this.mCurrentColor = Lines.Y_COLOR;
                break;
            case Lines.Z_AXIS:
                this.mCoordsArray = this.drawZAxis(
                    data.getLastCenter(),
                    data.getTrueCenter().z
                );
                this.mCurrentColor = Lines.Z_COLOR;
                break;
            default:
                this.mCoordsArray = null;
                break;
        }
        if (this.mCoordsArray != null) {
            this.mVertexBuffer.put(this.mCoordsArray);
            this.mVertexBuffer.position(0);
            GLES20.glVertexAttribPointer(
                this.mPositionHandle,
                this.COORDS_PER_VERTEX,
                GLES20.GL_FLOAT,
                false,
                this.vertexStride,
                this.mVertexBuffer
            );
            this.mColorHandle = GLES20.glGetUniformLocation(
                this.mProgram,
                "vColor"
            );
            GLES20.glUniform4fv(
                this.mColorHandle,
                1,
                this.mCurrentColor,
                0
            );
            this.mMVPMatrixHandle = GLES20.glGetUniformLocation(
                this.mProgram,
                "uMVPMatrix"
            );
            
                ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20.glUniformMatrix4fv(
                this.mMVPMatrixHandle,
                1,
                false,
                mvpMatrix,
                0
            );
            
            ViewerRenderer.checkGlError("glUniformMatrix4fv");
            GLES20.glDrawArrays(
                GLES20.GL_LINES,
                0,
                this.vertexCount
            );
            let points: number[] = function(d) {
                // new float[20]
                // TODO: Consider refactoring this array initialization to be more readable.
                let r = [];
                for (let i = 0; i < d; i++) r.push(0);
                return r;
            }(20);
            let i: number = 0;
            let radius: number = <number> 0.75;
            for (let angle: number = 0; angle < 2 * Math.PI; angle = 0.630) {
                points[i] = radius * <number> Math.cos(angle);
                points[i] = radius * <number> Math.sin(angle);
                i++;
            }
            GLES20.glDrawArrays(
                GLES20.GL_POINTS,
                0,
                this.vertexCount
            );
            GLES20.glDisableVertexAttribArray(this.mPositionHandle);
        }
    }
}
