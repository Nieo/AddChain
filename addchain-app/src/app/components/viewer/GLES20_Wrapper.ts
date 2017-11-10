export class GLES20 {
    static set gl(value: WebGLRenderingContext) {
        this._gl = value;
    }
    static GL_VERTEX_SHADER: number = 0x8B31;
    static GL_FRAGMENT_SHADER: number = 0x8B30;
    static GL_ONE: number = 1;
    static GL_ONE_MINUS_SRC_ALPHA: number = 0x0303;
    static GL_SRC_COLOR: number = 0x0300;
    static GL_CONSTANT_COLOR: number = 0x8001;
    static GL_FLOAT: number = 0x1406;
    static GL_LINE_LOOP: number = 0x0002;
    static GL_TRIANGLES: number = 0x0004;
    static GL_LINES: number = 0x0001;
    static GL_COLOR_BUFFER_BIT: number = 0x00004000;
    static GL_DEPTH_BUFFER_BIT: number = 0x00000400;
    static GL_BLEND: number = 0x0BE2;
    static GL_DEPTH_TEST: number = 0x0B71;
    static GL_RGBA: number = 0x1908;
    static GL_UNSIGNED_BYTE: number = 0x1401;
    static GL_NO_ERROR: number = 0;



    private static _gl: WebGLRenderingContext;

    static glBindAttribLocation(mProgram: WebGLProgram, index: number, name: string) {
        GLES20._gl.bindAttribLocation(mProgram, index, name);
    }

    static glAttachShader(mProgramOverhang: WebGLProgram, fragmentShader: WebGLShader) {
        GLES20._gl.attachShader(mProgramOverhang, fragmentShader);
    }

    static glCreateProgram(): WebGLProgram {
        return GLES20._gl.createProgram();
    }

    static glLinkProgram(mProgram: WebGLProgram) {
        GLES20._gl.linkProgram(mProgram);
    }

    static glUseProgram(mProgramOverhang: WebGLProgram) {
        GLES20._gl.useProgram(mProgramOverhang);
    }

    static glBlendFunc(sFactor: number, dFactor: number) {
        GLES20._gl.blendFunc(sFactor, dFactor);
    }

    static glGetAttribLocation(program: WebGLProgram, name: string): number {
        return GLES20._gl.getAttribLocation(program, name);
    }

    static glVertexAttribPointer_(index: number, size: number, type: number, normalized: boolean, stride: number, mTriangleBuffer: Float32Array) {
        GLES20._gl.vertexAttribPointer(index,size,type,normalized,stride,0)
    }

    static glVertexAttribPointer(index: number, size: number, type: number, normalized: boolean, stride: number, offset: number) {
        GLES20._gl.vertexAttribPointer(index, size, type, normalized, stride, offset);
    }

    static glEnableVertexAttribArray(mPositionHandle: number) {
        GLES20._gl.enableVertexAttribArray(mPositionHandle);
    }

    static glGetUniformLocation(program: WebGLProgram, name: string): WebGLUniformLocation {
        return GLES20._gl.getUniformLocation(program, name);
    }

    static glUniform4fv(location: WebGLUniformLocation, v: Float32Array) {
        GLES20._gl.uniform4fv(location, v);
    }

    static glUniform1f(location: WebGLUniformLocation, x: number) {
        GLES20._gl.uniform1f(location, x);
    }

    static glUniformMatrix4fv(location: WebGLUniformLocation, number: number, transpose: boolean, mMatrix: number[], number2: number) {
        GLES20._gl.uniformMatrix4fv(location, transpose, mMatrix);
    }

    static glUniform3f(location: WebGLUniformLocation, x: number, y: number, z: number) {
        GLES20._gl.uniform3f(location, x, y, z);
    }

    static glDrawArrays(mode: number, first: number, count: number) {
        GLES20._gl.drawArrays(mode,first, count);
    }

    static glClear(mask: number) {
        GLES20._gl.clear(mask);
    }

    static glEnable(cap: number) {
        GLES20._gl.enable(cap);
    }

    static glReadPixels(x: number, y: number, width: number, height: number, format: number, type: number, pixels: ArrayBufferView) {
        GLES20._gl.readPixels(x, y, width, height, format, type, pixels);
    }

    static glCreateShader(type: number): WebGLShader{
        return GLES20._gl.createShader(type);
    }

    static glShaderSource(shader: WebGLShader, shaderCode: string) {
        GLES20._gl.shaderSource(shader, shaderCode);
    }

    static glCompileShader(shader: WebGLShader) {
        GLES20._gl.compileShader(shader);
    }

    static glGetError(): number {
        return GLES20._gl.getError();
    }

    static glViewport(x: number, y: number, width: number, height: number) {
        GLES20._gl.viewport(x, y, width, height);
    }

    static glClearColor(red: number, green: number, blue: number, alpha: number) {
        GLES20._gl.clearColor(red, green, blue, alpha);
    }

    static glDisableVertexAttribArray(index: number) {
        GLES20._gl.disableVertexAttribArray(index);
    }
}
