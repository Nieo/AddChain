"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var GLES20_1 = require("./android/opengl/GLES20");
var ByteBuffer_1 = require("./java/nio/ByteBuffer");
var ByteOrder_1 = require("./java/nio/ByteOrder");
var StlObject = (function () {
    function StlObject(data, context, state) {
        this.vertexShaderCode = "uniform mat4 u_MVPMatrix;      \n" +
            "uniform mat4 u_MVMatrix;       \n" +
            "uniform vec3 u_LightPos;       \n" +
            "uniform vec4 a_Color;          \n" +
            "attribute vec4 a_Position;     \n" +
            "attribute vec3 a_Normal;       \n" +
            "varying vec4 v_Color;          \n" +
            "void main()                    \n" + "{                              \n" +
            "   vec3 modelViewVertex = vec3(u_MVMatrix * a_Position);              			\n" +
            "   vec3 modelViewNormal = normalize(vec3(u_MVMatrix * vec4(a_Normal, 0.0)));   \n" +
            "   float distance = length(u_LightPos - modelViewVertex);             			\n" +
            "   vec3 lightVector = normalize(u_LightPos - modelViewVertex);        			\n" +
            "   float diffuse = abs(dot(modelViewNormal, lightVector));       				\n" +
            "   diffuse +=0.2;  											   				\n" +
            "   v_Color = a_Color * diffuse;                                       			\n" +
            "   gl_Position = u_MVPMatrix * a_Position;                            			\n" + "}                                                                     			\n";
        this.vertexOverhangShaderCode = "uniform mat4 u_MVPMatrix;      \n" +
            "uniform mat4 u_MVMatrix;       \n" +
            "uniform mat4 u_MMatrix;       \n" +
            "uniform vec3 u_LightPos;       \n" +
            "uniform vec4 a_Color;          \n" +
            "uniform vec4 a_ColorOverhang;  \n" +
            "uniform float a_CosAngle;		\n" +
            "attribute vec4 a_Position;     \n" +
            "attribute vec3 a_Normal;       \n" +
            "varying vec4 v_Color;          \n" +
            "void main()                    \n" + "{                              \n" +
            "   vec3 modelViewVertex = vec3(u_MVMatrix * a_Position);              			\n" +
            "   vec3 modelViewNormal = normalize(vec3(u_MVMatrix * vec4(a_Normal, 0.0)));   \n" +
            "   float distance = length(u_LightPos - modelViewVertex);             			\n" +
            "   vec3 lightVector = normalize(u_LightPos - modelViewVertex);        			\n" +
            "   float diffuse = abs(dot(modelViewNormal, lightVector));       				\n" +
            "   diffuse +=0.2;  											   				\n" +
            "	vec3 overhang = normalize(vec3(u_MMatrix * vec4(a_Normal, 0.0)));   		\n" + "	if (overhang.z < -a_CosAngle) 												\n" + "	{                             			 									\n" + "		v_Color = a_ColorOverhang * diffuse;									\n" + "	} else {																	\n" + "   	v_Color = a_Color * diffuse;                                    		\n" + "	}                             			 									\n" +
            "   gl_Position = u_MVPMatrix * a_Position;                            			\n" + "}                                                                     			\n";
        this.fragmentShaderCode = "precision mediump float;       \n" +
            "varying vec4 v_Color;          \n" +
            "void main()                    \n" + "{                              \n" +
            "   gl_FragColor = v_Color;     \n" + "}   " + "" + "            					\n";
        this.VERTEX_STRIDE = StlObject.COORDS_PER_VERTEX * 4;
        this.mOverhangAngle = 45;
        this.mData = data;
        this.mVertexArray = this.mData.getVertexArray();
        this.mNormalArray = this.mData.getNormalArray();
        this.vertexCount = this.mVertexArray.length / StlObject.COORDS_PER_VERTEX;
        this.configStlObject(state);
        var auxPlate;
        if (
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerMainFragment.getCurrentPlate() != null) {
            auxPlate =
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.getCurrentPlate();
        }
        else
            auxPlate = [
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_LONG,
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_WITDH,
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_HEIGHT
            ];
        if (this.mData.getMaxX() > auxPlate[0] || this.mData.getMinX() < -auxPlate[0] || this.mData.getMaxY() > auxPlate[1] || this.mData.getMinY() < -auxPlate[1] || this.mData.getMaxZ() > auxPlate[2] || this.mData.getMinZ() < 0)
            this.setColor(StlObject.colorObjectOut);
        else
            this.setColor(StlObject.colorNormal);
        var vbb = ByteBuffer_1.ByteBuffer.allocateDirect(this.mVertexArray.length * 4);
        vbb.order(ByteOrder_1.ByteOrder.nativeOrder());
        this.mTriangleBuffer = vbb.asFloatBuffer();
        this.mTriangleBuffer.put(this.mVertexArray);
        this.mTriangleBuffer.position(0);
        var nbb = ByteBuffer_1.ByteBuffer.allocateDirect(this.mNormalArray.length * 4);
        nbb.order(ByteOrder_1.ByteOrder.nativeOrder());
        this.mNormalBuffer = nbb.asFloatBuffer();
        this.mNormalBuffer.put(this.mNormalArray);
        this.mNormalBuffer.position(0);
        var vertexOverhangShader = 
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.loadShader(GLES20_1.GLES20.GL_VERTEX_SHADER, this.vertexOverhangShaderCode);
        var vertexShader = 
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.loadShader(GLES20_1.GLES20.GL_VERTEX_SHADER, this.vertexShaderCode);
        var fragmentShader = 
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.loadShader(GLES20_1.GLES20.GL_FRAGMENT_SHADER, this.fragmentShaderCode);
        this.mProgram = GLES20_1.GLES20.glCreateProgram();
        this.mProgramOverhang = GLES20_1.GLES20.glCreateProgram();
        GLES20_1.GLES20.glAttachShader(this.mProgram, vertexShader);
        GLES20_1.GLES20.glAttachShader(this.mProgram, fragmentShader);
        GLES20_1.GLES20.glAttachShader(this.mProgramOverhang, vertexOverhangShader);
        GLES20_1.GLES20.glAttachShader(this.mProgramOverhang, fragmentShader);
        GLES20_1.GLES20.glBindAttribLocation(this.mProgram, 0, "a_Position");
        GLES20_1.GLES20.glBindAttribLocation(this.mProgram, 1, "a_Normal");
        GLES20_1.GLES20.glBindAttribLocation(this.mProgramOverhang, 0, "a_Position");
        GLES20_1.GLES20.glBindAttribLocation(this.mProgramOverhang, 1, "a_Normal");
        GLES20_1.GLES20.glLinkProgram(this.mProgram);
        GLES20_1.GLES20.glLinkProgram(this.mProgramOverhang);
    }
    StlObject.prototype.configStlObject = function (state) {
        switch (state) {
            case 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerSurfaceView.XRAY:
                this.setXray(true);
                break;
            case 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerSurfaceView.TRANSPARENT:
                this.setTransparent(true);
                break;
            case 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerSurfaceView.OVERHANG:
                this.setOverhang(true);
                break;
        }
    };
    StlObject.prototype.setTransparent = function (transparent) {
        this.mTransparent = transparent;
    };
    StlObject.prototype.setXray = function (xray) {
        this.mXray = xray;
    };
    StlObject.prototype.setOverhang = function (overhang) {
        this.mOverhang = overhang;
    };
    StlObject.prototype.setColor = function (c) {
        this.mColor = c;
    };
    StlObject.prototype.draw = function (mvpMatrix, mvMatrix, lightVector, mMatrix) {
        var program = this.mProgram;
        if (this.mOverhang) {
            program = this.mProgramOverhang;
            GLES20_1.GLES20.glUseProgram(this.mProgramOverhang);
        }
        else {
            program = this.mProgram;
            GLES20_1.GLES20.glUseProgram(this.mProgram);
        }
        if (this.mTransparent)
            GLES20_1.GLES20.glBlendFunc(GLES20_1.GLES20.GL_ONE, GLES20_1.GLES20.GL_ONE_MINUS_SRC_ALPHA);
        else
            GLES20_1.GLES20.glBlendFunc(GLES20_1.GLES20.GL_SRC_COLOR, GLES20_1.GLES20.GL_CONSTANT_COLOR);
        this.mPositionHandle = GLES20_1.GLES20.glGetAttribLocation(program, "a_Position");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetAttribLocation");
        GLES20_1.GLES20.glVertexAttribPointer(this.mPositionHandle, StlObject.COORDS_PER_VERTEX, GLES20_1.GLES20.GL_FLOAT, false, this.VERTEX_STRIDE, this.mTriangleBuffer);
        GLES20_1.GLES20.glEnableVertexAttribArray(this.mPositionHandle);
        if (this.mOverhang) {
            this.mColorOverhangHandle = GLES20_1.GLES20.glGetUniformLocation(program, "a_ColorOverhang");
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation COLOROVERHANG");
            GLES20_1.GLES20.glUniform4fv(this.mColorOverhangHandle, 1, StlObject.colorOverhang, 0);
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniform4fv");
            this.mCosAngleHandle = GLES20_1.GLES20.glGetUniformLocation(program, "a_CosAngle");
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20_1.GLES20.glUniform1f(this.mCosAngleHandle, (number), Math.cos(Math.toRadians(this.mOverhangAngle)));
            this.mMMatrixHandle = GLES20_1.GLES20.glGetUniformLocation(program, "u_MMatrix");
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20_1.GLES20.glUniformMatrix4fv(this.mMMatrixHandle, 1, false, mMatrix, 0);
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        }
        this.mColorHandle = GLES20_1.GLES20.glGetUniformLocation(program, "a_Color");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetUniformLocation a_Color");
        GLES20_1.GLES20.glUniform4fv(this.mColorHandle, 1, this.mColor, 0);
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glUniform4fv");
        this.mNormalHandle = GLES20_1.GLES20.glGetAttribLocation(program, "a_Normal");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetAttribLocation");
        GLES20_1.GLES20.glVertexAttribPointer(this.mNormalHandle, StlObject.COORDS_PER_VERTEX, GLES20_1.GLES20.GL_FLOAT, false, this.VERTEX_STRIDE, this.mNormalBuffer);
        GLES20_1.GLES20.glEnableVertexAttribArray(this.mNormalHandle);
        this.mMVPMatrixHandle = GLES20_1.GLES20.glGetUniformLocation(program, "u_MVPMatrix");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20_1.GLES20.glUniformMatrix4fv(this.mMVPMatrixHandle, 1, false, mvpMatrix, 0);
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        this.mMVMatrixHandle = GLES20_1.GLES20.glGetUniformLocation(program, "u_MVMatrix");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20_1.GLES20.glUniformMatrix4fv(this.mMVMatrixHandle, 1, false, mvMatrix, 0);
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        this.mLightPosHandle = GLES20_1.GLES20.glGetUniformLocation(program, "u_LightPos");
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20_1.GLES20.glUniform3f(this.mLightPosHandle, lightVector[0], lightVector[1], lightVector[2]);
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerRenderer.checkGlError("glUniform3f");
        if (this.mXray) {
            for (var i = 0; i < this.vertexCount / StlObject.COORDS_PER_VERTEX; i++) {
                GLES20_1.GLES20.glDrawArrays(GLES20_1.GLES20.GL_LINE_LOOP, i * 3, 3);
            }
        }
        else
            GLES20_1.GLES20.glDrawArrays(GLES20_1.GLES20.GL_TRIANGLES, 0, this.vertexCount);
    };
    return StlObject;
}());
StlObject.COORDS_PER_VERTEX = 3;
StlObject.COLORS_PER_VERTEX = 4;
StlObject.colorNormal = [
    0.2,
    0.709803922,
    0.898039216,
    1.0
];
StlObject.colorOverhang = [
    1,
    0,
    0,
    1.0
];
StlObject.colorSelectedObject = [
    1.0,
    1.0,
    0.0,
    1.0
];
StlObject.colorObjectOut = [
    1.0,
    1.0,
    1.0,
    1.0
];
StlObject.colorObjectOutTouched = [
    1.0,
    1.0,
    1.0,
    1.0
];
exports.StlObject = StlObject;
