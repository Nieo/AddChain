export class Matrix {


    static setIdentityM(sm: number[], smOffset: number) {
        for (let i: number = 0; i < 16; i++) {
            sm[smOffset + i] = 0;
        }
        for (let i: number = 0; i < 16; i += 5) {
            sm[smOffset + i] = 1.0;
        }
    }

    static translateM(m: number[], mOffset: number, x: number, y: number, z: number) {
        for (let i: number = 0; i < 4; i++) {
            let mi: number = mOffset + i;
            m[12 + mi] += m[mi] * x + m[4 + mi] * y + m[8 + mi] * z;
        }
    }

    static rotateM(m: number[], mOffset: number, a: number, x: number, y: number, z: number) {
        var temp: Array<number> = [32];
        Matrix.setRotateM(temp, 0, a, x, y, z);
        Matrix.multiplyMM(temp, 16, m, mOffset, temp, 0);
        //System.arraycopy(temp, 16, m, mOffset, 16);
        m.splice(mOffset, 16);
        m.concat(temp.slice(16, temp.length - 1))
    }

    static setRotateM(rm: number[], rmOffset: number, a: number, x: number, y: number, z: number) {
        rm[rmOffset + 3] = 0;
        rm[rmOffset + 7] = 0;
        rm[rmOffset + 11] = 0;
        rm[rmOffset + 12] = 0;
        rm[rmOffset + 13] = 0;
        rm[rmOffset + 14] = 0;
        rm[rmOffset + 15] = 1;
        a *= <number> (Math.PI / 180.0);
        let s: number = <number> Math.sin(a);
        let c: number = <number> Math.cos(a);
        if (1.0 == x && 0.0 == y && 0.0 == z) {
            rm[rmOffset + 5] = c;
            rm[rmOffset + 10] = c;
            rm[rmOffset + 6] = s;
            rm[rmOffset + 9] = -s;
            rm[rmOffset + 1] = 0;
            rm[rmOffset + 2] = 0;
            rm[rmOffset + 4] = 0;
            rm[rmOffset + 8] = 0;
            rm[rmOffset + 0] = 1;
        } else if (0.0 == x && 1.0 == y && 0.0 == z) {
            rm[rmOffset + 0] = c;
            rm[rmOffset + 10] = c;
            rm[rmOffset + 8] = s;
            rm[rmOffset + 2] = -s;
            rm[rmOffset + 1] = 0;
            rm[rmOffset + 4] = 0;
            rm[rmOffset + 6] = 0;
            rm[rmOffset + 9] = 0;
            rm[rmOffset + 5] = 1;
        } else if (0.0 == x && 0.0 == y && 1.0 == z) {
            rm[rmOffset + 0] = c;
            rm[rmOffset + 5] = c;
            rm[rmOffset + 1] = s;
            rm[rmOffset + 4] = -s;
            rm[rmOffset + 2] = 0;
            rm[rmOffset + 6] = 0;
            rm[rmOffset + 8] = 0;
            rm[rmOffset + 9] = 0;
            rm[rmOffset + 10] = 1;
        } else {
            let len: number = Matrix._length(x, y, z);
            if (1.0 != len) {
                let recipLen: number = 1.0 / len;
                x *= recipLen;
                y *= recipLen;
                z *= recipLen;
            }
            let nc: number = 1.0 - c;
            let xy: number = x * y;
            let yz: number = y * z;
            let zx: number = z * x;
            let xs: number = x * s;
            let ys: number = y * s;
            let zs: number = z * s;
            rm[rmOffset + 0] = x * x * nc + c;
            rm[rmOffset + 4] = xy * nc - zs;
            rm[rmOffset + 8] = zx * nc + ys;
            rm[rmOffset + 1] = xy * nc + zs;
            rm[rmOffset + 5] = y * y * nc + c;
            rm[rmOffset + 9] = yz * nc - xs;
            rm[rmOffset + 2] = zx * nc - ys;
            rm[rmOffset + 6] = yz * nc + xs;
            rm[rmOffset + 10] = z * z * nc + c;
        }
    }

    static _length(x: number, y: number, z: number): number {
        return Math.sqrt(x * x + y * y + z * z);
    }

    static multiplyMM(mFinalMatrix: number[], number: number, mTemporaryMatrix: number[], number2: number, rotateObjectMatrix: number[], number3: number) {

    }

    static multiplyMV(nearPointWorld: number[], number: number, invertedMVPMatrix: number[], number2: number, nearPointNdc: number[], number3: number) {

    }

    static perspectiveM(m: number[], mOffset: number, fovy: number, aspect: number, zNear: number, zFar: number) {
        let f: number = 1.0 / (Math.tan(fovy * (Math.PI / 360.0)));
        let rangeReciprocal: number = 1.0 / (zNear - zFar);
        m[mOffset + 0] = f / aspect;
        m[mOffset + 1] = 0;
        m[mOffset + 2] = 0;
        m[mOffset + 3] = 0;
        m[mOffset + 4] = 0;
        m[mOffset + 5] = f;
        m[mOffset + 6] = 0;
        m[mOffset + 7] = 0;
        m[mOffset + 8] = 0;
        m[mOffset + 9] = 0;
        m[mOffset + 10] = (zFar + zNear) * rangeReciprocal;
        m[mOffset + 11] = -1;
        m[mOffset + 12] = 0;
        m[mOffset + 13] = 0;
        m[mOffset + 14] = 2.0 * zFar * zNear * rangeReciprocal;
        m[mOffset + 15] = 0;
    }

    static setLookAtM(rm: number[], rmOffset: number, eyeX: number, eyeY: number, eyeZ: number, centerX: number, centerY: number, centerZ: number, upX: number, upY: number, upZ: number) {
        // See the OpenGL GLUT documentation for gluLookAt for a description
        // of the algorithm. We implement it in a straightforward way:
        let fx: number = centerX - eyeX;
        let fy: number = centerY - eyeY;
        let fz: number = centerZ - eyeZ;
        // Normalize f
        let rlf: number = 1.0 / Matrix._length(fx, fy, fz);
        fx *= rlf;
        fy *= rlf;
        fz *= rlf;
        // compute s = f x up (x means "cross product")
        let sx: number = fy * upZ - fz * upY;
        let sy: number = fz * upX - fx * upZ;
        let sz: number = fx * upY - fy * upX;
        // and normalize s
        let rls: number = 1.0 / Matrix._length(sx, sy, sz);
        sx *= rls;
        sy *= rls;
        sz *= rls;
        // compute u = s x f
        let ux: number = sy * fz - sz * fy;
        let uy: number = sz * fx - sx * fz;
        let uz: number = sx * fy - sy * fx;
        rm[rmOffset + 0] = sx;
        rm[rmOffset + 1] = ux;
        rm[rmOffset + 2] = -fx;
        rm[rmOffset + 3] = 0.0;
        rm[rmOffset + 4] = sy;
        rm[rmOffset + 5] = uy;
        rm[rmOffset + 6] = -fy;
        rm[rmOffset + 7] = 0.0;
        rm[rmOffset + 8] = sz;
        rm[rmOffset + 9] = uz;
        rm[rmOffset + 10] = -fz;
        rm[rmOffset + 11] = 0.0;
        rm[rmOffset + 12] = 0.0;
        rm[rmOffset + 13] = 0.0;
        rm[rmOffset + 14] = 0.0;
        rm[rmOffset + 15] = 1.0;
        Matrix.translateM(rm, rmOffset, -eyeX, -eyeY, -eyeZ);
    }

    static invertM(mInv: number[], mInvOffset: number, m: number[], mOffset: number): boolean {
        // Invert a 4 x 4 matrix using Cramer's Rule
        // array of transpose source matrix
        let src: Array<number> = [16];
        // transpose matrix
        Matrix.transposeM(src, 0, m, mOffset);
        // temp array for pairs
        let tmp: Array<number> = [12];
        // calculate pairs for first 8 elements (cofactors)
        tmp[0] = src[10] * src[15];
        tmp[1] = src[11] * src[14];
        tmp[2] = src[9] * src[15];
        tmp[3] = src[11] * src[13];
        tmp[4] = src[9] * src[14];
        tmp[5] = src[10] * src[13];
        tmp[6] = src[8] * src[15];
        tmp[7] = src[11] * src[12];
        tmp[8] = src[8] * src[14];
        tmp[9] = src[10] * src[12];
        tmp[10] = src[8] * src[13];
        tmp[11] = src[9] * src[12];
        // Holds the destination matrix while we're building it up.
        let dst: Array<number> = [16];
        // calculate first 8 elements (cofactors)
        dst[0] = tmp[0] * src[5] + tmp[3] * src[6] + tmp[4] * src[7];
        dst[0] -= tmp[1] * src[5] + tmp[2] * src[6] + tmp[5] * src[7];
        dst[1] = tmp[1] * src[4] + tmp[6] * src[6] + tmp[9] * src[7];
        dst[1] -= tmp[0] * src[4] + tmp[7] * src[6] + tmp[8] * src[7];
        dst[2] = tmp[2] * src[4] + tmp[7] * src[5] + tmp[10] * src[7];
        dst[2] -= tmp[3] * src[4] + tmp[6] * src[5] + tmp[11] * src[7];
        dst[3] = tmp[5] * src[4] + tmp[8] * src[5] + tmp[11] * src[6];
        dst[3] -= tmp[4] * src[4] + tmp[9] * src[5] + tmp[10] * src[6];
        dst[4] = tmp[1] * src[1] + tmp[2] * src[2] + tmp[5] * src[3];
        dst[4] -= tmp[0] * src[1] + tmp[3] * src[2] + tmp[4] * src[3];
        dst[5] = tmp[0] * src[0] + tmp[7] * src[2] + tmp[8] * src[3];
        dst[5] -= tmp[1] * src[0] + tmp[6] * src[2] + tmp[9] * src[3];
        dst[6] = tmp[3] * src[0] + tmp[6] * src[1] + tmp[11] * src[3];
        dst[6] -= tmp[2] * src[0] + tmp[7] * src[1] + tmp[10] * src[3];
        dst[7] = tmp[4] * src[0] + tmp[9] * src[1] + tmp[10] * src[2];
        dst[7] -= tmp[5] * src[0] + tmp[8] * src[1] + tmp[11] * src[2];
        // calculate pairs for second 8 elements (cofactors)
        tmp[0] = src[2] * src[7];
        tmp[1] = src[3] * src[6];
        tmp[2] = src[1] * src[7];
        tmp[3] = src[3] * src[5];
        tmp[4] = src[1] * src[6];
        tmp[5] = src[2] * src[5];
        tmp[6] = src[0] * src[7];
        tmp[7] = src[3] * src[4];
        tmp[8] = src[0] * src[6];
        tmp[9] = src[2] * src[4];
        tmp[10] = src[0] * src[5];
        tmp[11] = src[1] * src[4];
        // calculate second 8 elements (cofactors)
        dst[8] = tmp[0] * src[13] + tmp[3] * src[14] + tmp[4] * src[15];
        dst[8] -= tmp[1] * src[13] + tmp[2] * src[14] + tmp[5] * src[15];
        dst[9] = tmp[1] * src[12] + tmp[6] * src[14] + tmp[9] * src[15];
        dst[9] -= tmp[0] * src[12] + tmp[7] * src[14] + tmp[8] * src[15];
        dst[10] = tmp[2] * src[12] + tmp[7] * src[13] + tmp[10] * src[15];
        dst[10] -= tmp[3] * src[12] + tmp[6] * src[13] + tmp[11] * src[15];
        dst[11] = tmp[5] * src[12] + tmp[8] * src[13] + tmp[11] * src[14];
        dst[11] -= tmp[4] * src[12] + tmp[9] * src[13] + tmp[10] * src[14];
        dst[12] = tmp[2] * src[10] + tmp[5] * src[11] + tmp[1] * src[9];
        dst[12] -= tmp[4] * src[11] + tmp[0] * src[9] + tmp[3] * src[10];
        dst[13] = tmp[8] * src[11] + tmp[0] * src[8] + tmp[7] * src[10];
        dst[13] -= tmp[6] * src[10] + tmp[9] * src[11] + tmp[1] * src[8];
        dst[14] = tmp[6] * src[9] + tmp[11] * src[11] + tmp[3] * src[8];
        dst[14] -= tmp[10] * src[11] + tmp[2] * src[8] + tmp[7] * src[9];
        dst[15] = tmp[10] * src[10] + tmp[4] * src[8] + tmp[9] * src[9];
        dst[15] -= tmp[8] * src[9] + tmp[11] * src[10] + tmp[5] * src[8];
        // calculate determinant
        let det: number =
            src[0] * dst[0] + src[1] * dst[1] + src[2] * dst[2] + src[3]
            * dst[3];
        if (det == 0.0) {
        }
        // calculate matrix inverse
        det = 1 / det;
        for (let j = 0; j < 16; j++)
            mInv[j + mInvOffset] = dst[j] * det;
        return true;
    }

    static scaleM(m: number[], mOffset: number, x: number, y: number, z: number) {
        for (let i: number = 0; i < 4; i++) {
            let mi: number = mOffset + i;
            m[mi] *= x;
            m[4 + mi] *= y;
            m[8 + mi] *= z;
        }
    }

    static transposeM(mTrans: number[], mTransOffset: number, m: number[], mOffset: number) {
        for (var i: number = 0; i < 4; i++) {
            let mBase: number = i * 4 + mOffset;
            mTrans[i + mTransOffset] = m[mBase];
            mTrans[i + 4 + mTransOffset] = m[mBase + 1];
            mTrans[i + 8 + mTransOffset] = m[mBase + 2];
            mTrans[i + 12 + mTransOffset] = m[mBase + 3];
        }
    }
}