export class GLES20 {
    static GL_VERTEX_SHADER: number;
    static GL_FRAGMENT_SHADER: number;
    static GL_ONE: number;
    static GL_ONE_MINUS_SRC_ALPHA: number;
    static GL_SRC_COLOR: number;
    static GL_CONSTANT_COLOR: number;
    static GL_FLOAT: number;
    static GL_LINE_LOOP: number;
    static GL_TRIANGLES: number;
    static GL_LINES: number;
    static GL_COLOR_BUFFER_BIT: number;
    static GL_DEPTH_BUFFER_BIT: number;
    static GL_BLEND: number;
    static GL_DEPTH_TEST: number;
    static GL_RGBA: number;
    static GL_UNSIGNED_BYTE: number;
    static GL_NO_ERROR: number;


    static glBindAttribLocation(mProgram: number, number: number, s: string) {

    }

    static glAttachShader(mProgramOverhang: number, fragmentShader: number) {

    }

    static glCreateProgram():number {

        return -1;
    }

    static glLinkProgram(mProgram: number) {

    }

    static glUseProgram(mProgramOverhang: number) {

    }

    static glBlendFunc(GL_ONE: any, GL_ONE_MINUS_SRC_ALPHA: any) {

    }

    static glGetAttribLocation(program: number, s: string):number {

        return -1
    }

    static glVertexAttribPointer(mPositionHandle: number, COORDS_PER_VERTEX: number, GL_FLOAT: any, b: boolean, VERTEX_STRIDE: number, mTriangleBuffer: Float32Array) {

    }

    static glEnableVertexAttribArray(mPositionHandle: number) {

    }

    static glGetUniformLocation(program: number, s: string):number {

        return -1;
    }

    static glUniform4fv(mColorOverhangHandle: number, number: number, colorOverhang: number[], number2: number) {

    }

    static glUniform1f(mCosAngleHandle: number, number: number) {

    }

    static glUniformMatrix4fv(mMMatrixHandle: number, number: number, b: boolean, mMatrix: number[], number2: number) {

    }

    static glUniform3f(mLightPosHandle: number, number: number, number2: number, number3: number) {

    }

    static glDrawArrays(GL_LINE_LOOP: any, number: number, number2: number) {

    }

    static glClear(number: number) {

    }

    static glEnable(constant: number) {

    }

    static glReadPixels(minX: number, minY: number, mWidth: number, mHeight: number, GL_RGBA: number, GL_UNSIGNED_BYTE: number, bb: ArrayBuffer) {

    }

    static glCreateShader(type: number): number{
        return -1;
    }

    static glShaderSource(shader: number, shaderCode: string) {

    }

    static glCompileShader(shader: number) {

    }

    static glGetError():number {
        return -1;
    }

    static glViewport(number: number, number2: number, width: number, height: number) {

    }

    static glClearColor(number: number, number2: number, number3: number, number4: number) {

    }
}