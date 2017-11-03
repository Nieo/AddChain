// package android.app.printerapp.viewer;

import { Context } from "./android/content/Context";
import { GLES20 } from "./android/opengl/GLES20";
import { ByteBuffer } from "./java/nio/ByteBuffer";
import { ByteOrder } from "./java/nio/ByteOrder";
import { FloatBuffer } from "./java/nio/FloatBuffer";

export class StlObject {
    private readonly vertexShaderCode: string = // A constant representing the combined model/view/projection matrix.
    "uniform mat4 u_MVPMatrix;      \n" + // A constant representing the combined model/view matrix.	
    "uniform mat4 u_MVMatrix;       \n" + // The position of the light in eye space.
    "uniform vec3 u_LightPos;       \n" + // Color information we will pass in.
    "uniform vec4 a_Color;          \n" + // Per-vertex position information we will pass in.
    "attribute vec4 a_Position;     \n" + // Per-vertex normal information we will pass in.
    "attribute vec3 a_Normal;       \n" + // This will be passed into the fragment shader.
    "varying vec4 v_Color;          \n" + // The entry point for our vertex shader.
    "void main()                    \n" + "{                              \n" + // Transform the vertex into eye space.
    "   vec3 modelViewVertex = vec3(u_MVMatrix * a_Position);              			\n" + // Transform the normal's orientation into eye space.
    "   vec3 modelViewNormal = normalize(vec3(u_MVMatrix * vec4(a_Normal, 0.0)));   \n" + // Will be used for attenuation.
    "   float distance = length(u_LightPos - modelViewVertex);             			\n" + // Get a lighting direction vector from the light to the vertex.
    "   vec3 lightVector = normalize(u_LightPos - modelViewVertex);        			\n" + // pointing in the same direction then it will get max illumination.
    "   float diffuse = abs(dot(modelViewNormal, lightVector));       				\n" + // Attenuate the light based on distance.
    "   diffuse +=0.2;  											   				\n" + // Multiply the color by the illumination level. It will be interpolated across the triangle.
    "   v_Color = a_Color * diffuse;                                       			\n" + // Multiply the vertex by the matrix to get the final point in normalized screen coordinates.		
    "   gl_Position = u_MVPMatrix * a_Position;                            			\n" + "}                                                                     			\n";

    private readonly vertexOverhangShaderCode: string = // A constant representing the combined model/view/projection matrix.
    "uniform mat4 u_MVPMatrix;      \n" + // A constant representing the combined model/view matrix.	
    "uniform mat4 u_MVMatrix;       \n" + // A constant representing the model	
    "uniform mat4 u_MMatrix;       \n" + // The position of the light in eye space.
    "uniform vec3 u_LightPos;       \n" + // Color information we will pass in.
    "uniform vec4 a_Color;          \n" + // Color information we will pass in.
    "uniform vec4 a_ColorOverhang;  \n" + //Overhang angle
    "uniform float a_CosAngle;		\n" + // Per-vertex position information we will pass in.
    "attribute vec4 a_Position;     \n" + // Per-vertex normal information we will pass in.
    "attribute vec3 a_Normal;       \n" + // This will be passed into the fragment shader.
    "varying vec4 v_Color;          \n" + // The entry point for our vertex shader.
    "void main()                    \n" + "{                              \n" + // Transform the vertex into eye space.
    "   vec3 modelViewVertex = vec3(u_MVMatrix * a_Position);              			\n" + // Transform the normal's orientation into eye space.
    "   vec3 modelViewNormal = normalize(vec3(u_MVMatrix * vec4(a_Normal, 0.0)));   \n" + // Will be used for attenuation.
    "   float distance = length(u_LightPos - modelViewVertex);             			\n" + // Get a lighting direction vector from the light to the vertex.
    "   vec3 lightVector = normalize(u_LightPos - modelViewVertex);        			\n" + // pointing in the same direction then it will get max illumination.
    "   float diffuse = abs(dot(modelViewNormal, lightVector));       				\n" + // Attenuate the light based on distance.
    "   diffuse +=0.2;  											   				\n" + // Multiply the color by the illumination level. It will be interpolated across the triangle.
    "	vec3 overhang = normalize(vec3(u_MMatrix * vec4(a_Normal, 0.0)));   		\n" + "	if (overhang.z < -a_CosAngle) 												\n" + "	{                             			 									\n" + "		v_Color = a_ColorOverhang * diffuse;									\n" + "	} else {																	\n" + "   	v_Color = a_Color * diffuse;                                    		\n" + "	}                             			 									\n" + // Multiply the vertex by the matrix to get the final point in normalized screen coordinates.		
    "   gl_Position = u_MVPMatrix * a_Position;                            			\n" + "}                                                                     			\n";

    private readonly fragmentShaderCode: string = // Set the default precision to medium. We don't need as high of a precision in the fragment shader.				
    "precision mediump float;       \n" + // This is the color from the vertex shader interpolated across the triangle per fragment.			  
    "varying vec4 v_Color;          \n" + // The entry point for our fragment shader.
    "void main()                    \n" + "{                              \n" + // Pass the color directly through the pipeline.		  
    "   gl_FragColor = v_Color;     \n" + "}   " + "" + "            					\n";

    private readonly mProgram: number;

    private readonly mProgramOverhang: number;

    private mPositionHandle: number;

    private mColorHandle: number;

    private mColorOverhangHandle: number;

    private mCosAngleHandle: number;

    private mNormalHandle: number;

    private mMMatrixHandle: number;

    private mMVPMatrixHandle: number;

    private mMVMatrixHandle: number;

    private mLightPosHandle: number;

    static readonly COORDS_PER_VERTEX: number = 3;

    static readonly COLORS_PER_VERTEX: number = 4;

    private readonly VERTEX_STRIDE: number = StlObject.COORDS_PER_VERTEX * 4;

    mColor: number[];

    public static colorNormal: number[] = [
        0.2,
        0.709803922,
        0.898039216,
        1.0
    ];

    public static colorOverhang: number[] = [
        1,
        0,
        0,
        1.0
    ];

    public static colorSelectedObject: number[] = [
        1.0,
        1.0,
        0.0,
        1.0
    ];

    public static colorObjectOut: number[] = [
        1.0,
        1.0,
        1.0,
        1.0
    ];

    public static colorObjectOutTouched: number[] = [
        1.0,
        1.0,
        1.0,
        1.0
    ];

    private readonly mData: 
        // TODO: Warning - type not found in scope.
    DataStorage;

    mVertexArray: number[];

    mNormalArray: number[];

    private readonly mNormalBuffer: FloatBuffer;

    private readonly mTriangleBuffer: FloatBuffer;

    private readonly vertexCount: number;

    private mTransparent: boolean;

    private mXray: boolean;

    private mOverhang: boolean;

    private mOverhangAngle: number = 45;

    public constructor(
            data: 
                // TODO: Warning - type not found in scope.
            DataStorage,
            context: Context,
            state: number) {
        this.mData = data;
        this.mVertexArray = this.mData.getVertexArray();
        this.mNormalArray = this.mData.getNormalArray();
        this.vertexCount = this.mVertexArray.length / StlObject.COORDS_PER_VERTEX;
        this.configStlObject(state);
        let auxPlate: number[];
        if (
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.getCurrentPlate() != null) {
            auxPlate = 
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.getCurrentPlate();
        } else auxPlate = [
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_LONG,
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_WITDH,
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.WitboxFaces.WITBOX_HEIGHT
        ];
        if (this.mData.getMaxX() > auxPlate[0] || this.mData.getMinX() < -auxPlate[0] || this.mData.getMaxY() > auxPlate[1] || this.mData.getMinY() < -auxPlate[1] || this.mData.getMaxZ() > auxPlate[2] || this.mData.getMinZ() < 0) this.setColor(StlObject.colorObjectOut); else this.setColor(StlObject.colorNormal);
        let vbb: ByteBuffer = ByteBuffer.allocateDirect(this.mVertexArray.length * 4);
        vbb.order(ByteOrder.nativeOrder());
        this.mTriangleBuffer = vbb.asFloatBuffer();
        this.mTriangleBuffer.put(this.mVertexArray);
        this.mTriangleBuffer.position(0);
        let nbb: ByteBuffer = ByteBuffer.allocateDirect(this.mNormalArray.length * 4);
        nbb.order(ByteOrder.nativeOrder());
        this.mNormalBuffer = nbb.asFloatBuffer();
        this.mNormalBuffer.put(this.mNormalArray);
        this.mNormalBuffer.position(0);
        let vertexOverhangShader: number = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.loadShader(
            GLES20.GL_VERTEX_SHADER,
            this.vertexOverhangShaderCode
        );
        let vertexShader: number = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.loadShader(
            GLES20.GL_VERTEX_SHADER,
            this.vertexShaderCode
        );
        let fragmentShader: number = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.loadShader(
            GLES20.GL_FRAGMENT_SHADER,
            this.fragmentShaderCode
        );
        this.mProgram = GLES20.glCreateProgram();
        this.mProgramOverhang = GLES20.glCreateProgram();
        GLES20.glAttachShader(
            this.mProgram,
            vertexShader
        );
        GLES20.glAttachShader(
            this.mProgram,
            fragmentShader
        );
        GLES20.glAttachShader(
            this.mProgramOverhang,
            vertexOverhangShader
        );
        GLES20.glAttachShader(
            this.mProgramOverhang,
            fragmentShader
        );
        GLES20.glBindAttribLocation(
            this.mProgram,
            0,
            "a_Position"
        );
        GLES20.glBindAttribLocation(
            this.mProgram,
            1,
            "a_Normal"
        );
        GLES20.glBindAttribLocation(
            this.mProgramOverhang,
            0,
            "a_Position"
        );
        GLES20.glBindAttribLocation(
            this.mProgramOverhang,
            1,
            "a_Normal"
        );
        GLES20.glLinkProgram(this.mProgram);
        GLES20.glLinkProgram(this.mProgramOverhang);
    }

    public configStlObject(state: number) : void {
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
    }

    public setTransparent(transparent: boolean) : void {
        this.mTransparent = transparent;
    }

    public setXray(xray: boolean) : void {
        this.mXray = xray;
    }

    public setOverhang(overhang: boolean) : void {
        this.mOverhang = overhang;
    }

    public setColor(c: number[]) : void {
        this.mColor = c;
    }

    public draw(
            mvpMatrix: number[],
            mvMatrix: number[],
            lightVector: number[],
            mMatrix: number[]) : void {
        let program: number = this.mProgram;
        if (this.mOverhang) {
            program = this.mProgramOverhang;
            GLES20.glUseProgram(this.mProgramOverhang);
        } else {
            program = this.mProgram;
            GLES20.glUseProgram(this.mProgram);
        }
        if (this.mTransparent) GLES20.glBlendFunc(
            GLES20.GL_ONE,
            GLES20.GL_ONE_MINUS_SRC_ALPHA
        ); else GLES20.glBlendFunc(
            GLES20.GL_SRC_COLOR,
            GLES20.GL_CONSTANT_COLOR
        );
        this.mPositionHandle = GLES20.glGetAttribLocation(
            program,
            "a_Position"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetAttribLocation");
        GLES20.glVertexAttribPointer(
            this.mPositionHandle,
            StlObject.COORDS_PER_VERTEX,
            GLES20.GL_FLOAT,
            false,
            this.VERTEX_STRIDE,
            this.mTriangleBuffer
        );
        GLES20.glEnableVertexAttribArray(this.mPositionHandle);
        if (this.mOverhang) {
            this.mColorOverhangHandle = GLES20.glGetUniformLocation(
                program,
                "a_ColorOverhang"
            );
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerRenderer.checkGlError("glGetUniformLocation COLOROVERHANG");
            GLES20.glUniform4fv(
                this.mColorOverhangHandle,
                1,
                StlObject.colorOverhang,
                0
            );
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerRenderer.checkGlError("glUniform4fv");
            this.mCosAngleHandle = GLES20.glGetUniformLocation(
                program,
                "a_CosAngle"
            );
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20.glUniform1f(
                this.mCosAngleHandle,
                (number) Math.cos(Math.toRadians(this.mOverhangAngle))
            );
            this.mMMatrixHandle = GLES20.glGetUniformLocation(
                program,
                "u_MMatrix"
            );
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerRenderer.checkGlError("glGetUniformLocation");
            GLES20.glUniformMatrix4fv(
                this.mMMatrixHandle,
                1,
                false,
                mMatrix,
                0
            );
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        }
        this.mColorHandle = GLES20.glGetUniformLocation(
            program,
            "a_Color"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation a_Color");
        GLES20.glUniform4fv(
            this.mColorHandle,
            1,
            this.mColor,
            0
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniform4fv");
        this.mNormalHandle = GLES20.glGetAttribLocation(
            program,
            "a_Normal"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetAttribLocation");
        GLES20.glVertexAttribPointer(
            this.mNormalHandle,
            StlObject.COORDS_PER_VERTEX,
            GLES20.GL_FLOAT,
            false,
            this.VERTEX_STRIDE,
            this.mNormalBuffer
        );
        GLES20.glEnableVertexAttribArray(this.mNormalHandle);
        this.mMVPMatrixHandle = GLES20.glGetUniformLocation(
            program,
            "u_MVPMatrix"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20.glUniformMatrix4fv(
            this.mMVPMatrixHandle,
            1,
            false,
            mvpMatrix,
            0
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        this.mMVMatrixHandle = GLES20.glGetUniformLocation(
            program,
            "u_MVMatrix"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20.glUniformMatrix4fv(
            this.mMVMatrixHandle,
            1,
            false,
            mvMatrix,
            0
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniformMatrix4fv");
        this.mLightPosHandle = GLES20.glGetUniformLocation(
            program,
            "u_LightPos"
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glGetUniformLocation");
        GLES20.glUniform3f(
            this.mLightPosHandle,
            lightVector[0],
            lightVector[1],
            lightVector[2]
        );
        
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerRenderer.checkGlError("glUniform3f");
        if (this.mXray) {
            for (let i: number = 0; i < this.vertexCount / StlObject.COORDS_PER_VERTEX; i++) {
                GLES20.glDrawArrays(
                    GLES20.GL_LINE_LOOP,
                    i * 3,
                    3
                );
            }
        } else GLES20.glDrawArrays(
            GLES20.GL_TRIANGLES,
            0,
            this.vertexCount
        );
    }
}
