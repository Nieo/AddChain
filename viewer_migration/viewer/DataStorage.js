// package android.app.printerapp.viewer;
import { Point } from "./Geometry";
import { Matrix } from "./GLMatrix";
export class DataStorage {
    constructor() {
        this.mVertexList = [];
        this.mNormalList = [];
        this.mLineLengthList = [];
        this.mLayerList = [];
        this.mTypeList = [];
        this.mRotationMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mModelMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mLastScaleFactorX = 1.0;
        this.mLastScaleFactorY = 1.0;
        this.mLastScaleFactorZ = 1.0;
        this.mLastCenter = new Point(0, 0, 0);
        Matrix.setIdentityM(this.mRotationMatrix, 0);
        Matrix.setIdentityM(this.mModelMatrix, 0);
    }
    copyData(d) {
        for (let i = 0; i < d.getLineLengthList().length; i++)
            this.mLineLengthList.push(d.getLineLengthList()[i]);
        this.mVertexArray = function (d) {
            // new float[d.getVertexArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(d.getVertexArray().length);
        for (let i = 0; i < d.getVertexArray().length; i++) {
            this.mVertexArray[i] = d.getVertexArray()[i];
        }
        this.mNormalArray = function (d) {
            // new float[d.getNormalArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(d.getNormalArray().length);
        for (let i = 0; i < d.getNormalArray().length; i++) {
            this.mNormalArray[i] = d.getNormalArray()[i];
        }
        this.mMaxLayer = d.getMaxLayer();
        this.mActualLayer = d.getActualLayer();
        this.mMinX = d.getMinX();
        this.mMinY = d.getMinY();
        this.mMinZ = d.getMinZ();
        this.mMaxX = d.getMaxX();
        this.mMaxY = d.getMaxY();
        this.mMaxZ = d.getMaxZ();
        this.mPath = d.getPathFile();
        this.mPathSnapshot = d.getPathSnapshot();
        this.mLastScaleFactorX = d.getLastScaleFactorX();
        this.mLastScaleFactorY = d.getLastScaleFactorY();
        this.mLastScaleFactorZ = d.getLastScaleFactorZ();
        this.mAdjustZ = d.getAdjustZ();
        this.mLastCenter = new Point(d.getLastCenter().x, d.getLastCenter().y, d.getLastCenter().z);
        for (let i = 0; i < this.mRotationMatrix.length; i++)
            this.mRotationMatrix[i] = d.getRotationMatrix()[i];
        for (let i = 0; i < this.mModelMatrix.length; i++)
            this.mModelMatrix[i] = d.getModelMatrix()[i];
    }
    setMaxLinesFile(maxLines) {
        this.mMaxLines = maxLines;
    }
    getMaxLinesFile() {
        return this.mMaxLines;
    }
    getCoordinateListSize() {
        return this.mVertexList.length;
    }
    addVertex(v) {
        this.mVertexList.push(v);
    }
    addLayer(layer) {
        this.mLayerList.push(layer);
    }
    addType(type) {
        this.mTypeList.push(type);
    }
    addNormal(normal) {
        this.mNormalList.push(normal);
    }
    addLineLength(length) {
        this.mLineLengthList.push(length);
    }
    fillVertexArray(center) {
        this.mVertexArray = function (d) {
            // new float[mVertexList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mVertexList.length);
        this.centerSTL(center);
    }
    initMaxMin() {
        this.setMaxX(-Number.MAX_VALUE);
        this.setMaxY(-Number.MAX_VALUE);
        this.setMaxZ(-Number.MAX_VALUE);
        this.setMinX(Number.MAX_VALUE);
        this.setMinY(Number.MAX_VALUE);
        this.setMinZ(Number.MAX_VALUE);
    }
    centerSTL(center) {
        let distX = 0;
        let distY = 0;
        let distZ = this.mMinZ;
        if (center) {
            distX = this.mMinX + (this.mMaxX - this.mMinX) / 2;
            distY = this.mMinY + (this.mMaxY - this.mMinY) / 2;
            distZ = this.mMinZ - DataStorage.MIN_Z;
        }
        // Log.i(
        //     "PrintView",
        //     distZ + ""
        // );
        for (let i = 0; i < this.mVertexList.length; i = i + 3) {
            this.mVertexArray[i] = this.mVertexList[i] - distX;
            this.mVertexArray[i + 1] = this.mVertexList[i + 1] - distY;
            this.mVertexArray[i + 2] = this.mVertexList[i + 2] - distZ;
        }
        this.mMinX = this.mMinX - distX;
        this.mMaxX = this.mMaxX - distX;
        this.mMinY = this.mMinY - distY;
        this.mMaxY = this.mMaxY - distY;
        this.mMinZ = this.mMinZ - distZ;
        this.mMaxZ = this.mMaxZ - distZ;
    }
    fillNormalArray() {
        this.mNormalArray = function (d) {
            // new float[mNormalList.size() * TRIANGLE_VERTEX]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mNormalList.length * DataStorage.TRIANGLE_VERTEX);
        let index = 0;
        let x;
        let y;
        let z;
        for (let i = 0; i < this.mNormalList.length; i = 3) {
            x = this.mNormalList[i];
            y = this.mNormalList[i + 1];
            z = this.mNormalList[i + 2];
            for (let j = 0; j < DataStorage.TRIANGLE_VERTEX; j++) {
                this.mNormalArray[index] = x;
                this.mNormalArray[index + 1] = y;
                this.mNormalArray[index + 2] = z;
                index = 3;
            }
        }
    }
    fillLayerArray() {
        this.mLayerArray = function (d) {
            // new int[mLayerList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mLayerList.length);
        for (let i = 0; i < this.mLayerList.length; i++) {
            this.mLayerArray[i] = this.mLayerList[i];
        }
    }
    fillTypeArray() {
        this.mTypeArray = function (d) {
            // new int[mTypeList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mTypeList.length);
        for (let i = 0; i < this.mTypeList.length; i++) {
            this.mTypeArray[i] = this.mTypeList[i];
        }
    }
    getVertexArray() {
        return this.mVertexArray;
    }
    getNormalArray() {
        return this.mNormalArray;
    }
    getTypeArray() {
        return this.mTypeArray;
    }
    getLayerArray() {
        return this.mLayerArray;
    }
    clearVertexList() {
        this.mVertexList.splice(0, this.mVertexList.length);
    }
    clearNormalList() {
        this.mNormalList.splice(0, this.mNormalList.length);
    }
    clearLayerList() {
        this.mLayerList.splice(0, this.mLayerList.length);
    }
    clearTypeList() {
        this.mTypeList.splice(0, this.mTypeList.length);
    }
    getLineLengthList() {
        return this.mLineLengthList;
    }
    changeTypeAtIndex(index, type) {
        this.mTypeList[index] = type;
    }
    getTypeListSize() {
        return this.mTypeList.length;
    }
    setActualLayer(layer) {
        this.mActualLayer = layer;
    }
    getActualLayer() {
        return this.mActualLayer;
    }
    setMaxLayer(maxLayer) {
        this.mMaxLayer = maxLayer;
        this.mActualLayer = maxLayer;
    }
    getMaxLayer() {
        return this.mMaxLayer;
    }
    getHeight() {
        return this.mMaxZ - this.mMinZ;
    }
    getWidth() {
        return this.mMaxY - this.mMinY;
    }
    getLong() {
        return this.mMaxX - this.mMinX;
    }
    adjustMaxMin(x, y, z) {
        if (x > this.mMaxX) {
            this.mMaxX = x;
        }
        if (y > this.mMaxY) {
            this.mMaxY = y;
        }
        if (z > this.mMaxZ) {
            this.mMaxZ = z;
        }
        if (x < this.mMinX) {
            this.mMinX = x;
        }
        if (y < this.mMinY) {
            this.mMinY = y;
        }
        if (z < this.mMinZ) {
            this.mMinZ = z;
        }
    }
    setMinX(x) {
        this.mMinX = x;
    }
    getMinX() {
        return this.mMinX;
    }
    setMinY(y) {
        this.mMinY = y;
    }
    getMinY() {
        return this.mMinY;
    }
    setMinZ(z) {
        this.mMinZ = z;
    }
    getMinZ() {
        return this.mMinZ;
    }
    setMaxX(x) {
        this.mMaxX = x;
    }
    getMaxX() {
        return this.mMaxX;
    }
    setMaxY(y) {
        this.mMaxY = y;
    }
    getMaxY() {
        return this.mMaxY;
    }
    setMaxZ(z) {
        this.mMaxZ = z;
    }
    getMaxZ() {
        return this.mMaxZ;
    }
    setPathFile(path) {
        this.mPath = path;
    }
    getPathFile() {
        return this.mPath;
    }
    setPathSnapshot(path) {
        this.mPathSnapshot = path;
    }
    getPathSnapshot() {
        return this.mPathSnapshot;
    }
    setLastCenter(p) {
        this.mLastCenter = p;
    }
    getTrueCenter() {
        let x = (this.mMaxX + this.mMinX) / 2;
        let y = (this.mMaxY + this.mMinY) / 2;
        let z = (this.mMaxZ + this.mMinZ) / 2;
        return new Point(x, y, z);
    }
    getLastCenter() {
        return this.mLastCenter;
    }
    setRotationMatrix(m) {
        for (let i = 0; i < this.mRotationMatrix.length; i++) {
            this.mRotationMatrix[i] = m[i];
        }
    }
    getRotationMatrix() {
        return this.mRotationMatrix;
    }
    setModelMatrix(m) {
        for (let i = 0; i < this.mModelMatrix.length; i++) {
            this.mModelMatrix[i] = m[i];
        }
    }
    getModelMatrix() {
        return this.mModelMatrix;
    }
    setLastScaleFactorX(f) {
        this.mLastScaleFactorX = f;
    }
    setLastScaleFactorY(f) {
        this.mLastScaleFactorY = f;
    }
    setLastScaleFactorZ(f) {
        this.mLastScaleFactorZ = f;
    }
    getLastScaleFactorX() {
        return this.mLastScaleFactorX;
    }
    getLastScaleFactorY() {
        return this.mLastScaleFactorY;
    }
    getLastScaleFactorZ() {
        return this.mLastScaleFactorZ;
    }
    setStateObject(state) {
        this.mStateObject = state;
    }
    getStateObject() {
        return this.mStateObject;
    }
    setAdjustZ(z) {
        this.mAdjustZ = z;
    }
    getAdjustZ() {
        return this.mAdjustZ;
    }
}
DataStorage.MOVE = 0;
DataStorage.FILL = 1;
DataStorage.PERIMETER = 2;
DataStorage.RETRACT = 3;
DataStorage.COMPENSATE = 4;
DataStorage.BRIDGE = 5;
DataStorage.SKIRT = 6;
DataStorage.WALL_INNER = 7;
DataStorage.WALL_OUTER = 8;
DataStorage.SUPPORT = 9;
DataStorage.TRIANGLE_VERTEX = 3;
DataStorage.MIN_Z = 0.1;
