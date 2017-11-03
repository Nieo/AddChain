"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var Log_1 = require("./android/app/printerapp/Log");
var Point_1 = require("./android/app/printerapp/viewer/Geometry/Point");
var Matrix_1 = require("./android/opengl/Matrix");
var ArrayList_1 = require("./java/util/ArrayList");
var DataStorage = (function () {
    function DataStorage() {
        this.mVertexList = new ArrayList_1.ArrayList();
        this.mNormalList = new ArrayList_1.ArrayList();
        this.mLineLengthList = new ArrayList_1.ArrayList();
        this.mLayerList = new ArrayList_1.ArrayList();
        this.mTypeList = new ArrayList_1.ArrayList();
        this.mRotationMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mModelMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mLastScaleFactorX = 1.0;
        this.mLastScaleFactorY = 1.0;
        this.mLastScaleFactorZ = 1.0;
        this.mLastCenter = new Point_1.Point(0, 0, 0);
        Matrix_1.Matrix.setIdentityM(this.mRotationMatrix, 0);
        Matrix_1.Matrix.setIdentityM(this.mModelMatrix, 0);
    }
    DataStorage.prototype.copyData = function (d) {
        for (var i = 0; i < d.getLineLengthList().size(); i++)
            this.mLineLengthList.add(d.getLineLengthList().get(i));
        this.mVertexArray = function (d) {
            // new float[d.getVertexArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(d.getVertexArray().length);
        for (var i = 0; i < d.getVertexArray().length; i++) {
            this.mVertexArray[i] = d.getVertexArray()[i];
        }
        this.mNormalArray = function (d) {
            // new float[d.getNormalArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(d.getNormalArray().length);
        for (var i = 0; i < d.getNormalArray().length; i++) {
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
        this.mLastCenter = new Point_1.Point(d.getLastCenter().x, d.getLastCenter().y, d.getLastCenter().z);
        for (var i = 0; i < this.mRotationMatrix.length; i++)
            this.mRotationMatrix[i] = d.getRotationMatrix()[i];
        for (var i = 0; i < this.mModelMatrix.length; i++)
            this.mModelMatrix[i] = d.getModelMatrix()[i];
    };
    DataStorage.prototype.setMaxLinesFile = function (maxLines) {
        this.mMaxLines = maxLines;
    };
    DataStorage.prototype.getMaxLinesFile = function () {
        return this.mMaxLines;
    };
    DataStorage.prototype.getCoordinateListSize = function () {
        return this.mVertexList.size();
    };
    DataStorage.prototype.addVertex = function (v) {
        this.mVertexList.add(v);
    };
    DataStorage.prototype.addLayer = function (layer) {
        this.mLayerList.add(layer);
    };
    DataStorage.prototype.addType = function (type) {
        this.mTypeList.add(type);
    };
    DataStorage.prototype.addNormal = function (normal) {
        this.mNormalList.add(normal);
    };
    DataStorage.prototype.addLineLength = function (length) {
        this.mLineLengthList.add(length);
    };
    DataStorage.prototype.fillVertexArray = function (center) {
        this.mVertexArray = function (d) {
            // new float[mVertexList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mVertexList.size());
        this.centerSTL(center);
    };
    DataStorage.prototype.initMaxMin = function () {
        this.setMaxX(-Float.MAX_VALUE);
        this.setMaxY(-Float.MAX_VALUE);
        this.setMaxZ(-Float.MAX_VALUE);
        this.setMinX(Float.MAX_VALUE);
        this.setMinY(Float.MAX_VALUE);
        this.setMinZ(Float.MAX_VALUE);
    };
    DataStorage.prototype.centerSTL = function (center) {
        var distX = 0;
        var distY = 0;
        var distZ = this.mMinZ;
        if (center) {
            distX = this.mMinX + (this.mMaxX - this.mMinX) / 2;
            distY = this.mMinY + (this.mMaxY - this.mMinY) / 2;
            distZ = this.mMinZ - (number);
            DataStorage.MIN_Z;
        }
        Log_1.Log.i("PrintView", distZ + "");
        for (var i = 0; i < this.mVertexList.size(); i = i + 3) {
            this.mVertexArray[i] = this.mVertexList.get(i) - distX;
            this.mVertexArray[i + 1] = this.mVertexList.get(i + 1) - distY;
            this.mVertexArray[i + 2] = this.mVertexList.get(i + 2) - distZ;
        }
        this.mMinX = this.mMinX - distX;
        this.mMaxX = this.mMaxX - distX;
        this.mMinY = this.mMinY - distY;
        this.mMaxY = this.mMaxY - distY;
        this.mMinZ = this.mMinZ - distZ;
        this.mMaxZ = this.mMaxZ - distZ;
    };
    DataStorage.prototype.fillNormalArray = function () {
        this.mNormalArray = function (d) {
            // new float[mNormalList.size() * TRIANGLE_VERTEX]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mNormalList.size() * DataStorage.TRIANGLE_VERTEX);
        var index = 0;
        var x;
        var y;
        var z;
        for (var i = 0; i < this.mNormalList.size(); i = 3) {
            x = this.mNormalList.get(i);
            y = this.mNormalList.get(i + 1);
            z = this.mNormalList.get(i + 2);
            for (var j = 0; j < DataStorage.TRIANGLE_VERTEX; j++) {
                this.mNormalArray[index] = x;
                this.mNormalArray[index + 1] = y;
                this.mNormalArray[index + 2] = z;
                index = 3;
            }
        }
    };
    DataStorage.prototype.fillLayerArray = function () {
        this.mLayerArray = function (d) {
            // new int[mLayerList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mLayerList.size());
        for (var i = 0; i < this.mLayerList.size(); i++) {
            this.mLayerArray[i] = this.mLayerList.get(i);
        }
    };
    DataStorage.prototype.fillTypeArray = function () {
        this.mTypeArray = function (d) {
            // new int[mTypeList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(this.mTypeList.size());
        for (var i = 0; i < this.mTypeList.size(); i++) {
            this.mTypeArray[i] = this.mTypeList.get(i);
        }
    };
    DataStorage.prototype.getVertexArray = function () {
        return this.mVertexArray;
    };
    DataStorage.prototype.getNormalArray = function () {
        return this.mNormalArray;
    };
    DataStorage.prototype.getTypeArray = function () {
        return this.mTypeArray;
    };
    DataStorage.prototype.getLayerArray = function () {
        return this.mLayerArray;
    };
    DataStorage.prototype.clearVertexList = function () {
        this.mVertexList.clear();
    };
    DataStorage.prototype.clearNormalList = function () {
        this.mNormalList.clear();
    };
    DataStorage.prototype.clearLayerList = function () {
        this.mLayerList.clear();
    };
    DataStorage.prototype.clearTypeList = function () {
        this.mTypeList.clear();
    };
    DataStorage.prototype.getLineLengthList = function () {
        return this.mLineLengthList;
    };
    DataStorage.prototype.changeTypeAtIndex = function (index, type) {
        this.mTypeList.set(index, type);
    };
    DataStorage.prototype.getTypeListSize = function () {
        return this.mTypeList.size();
    };
    DataStorage.prototype.setActualLayer = function (layer) {
        this.mActualLayer = layer;
    };
    DataStorage.prototype.getActualLayer = function () {
        return this.mActualLayer;
    };
    DataStorage.prototype.setMaxLayer = function (maxLayer) {
        this.mMaxLayer = maxLayer;
        this.mActualLayer = maxLayer;
    };
    DataStorage.prototype.getMaxLayer = function () {
        return this.mMaxLayer;
    };
    DataStorage.prototype.getHeight = function () {
        return this.mMaxZ - this.mMinZ;
    };
    DataStorage.prototype.getWidth = function () {
        return this.mMaxY - this.mMinY;
    };
    DataStorage.prototype.getLong = function () {
        return this.mMaxX - this.mMinX;
    };
    DataStorage.prototype.adjustMaxMin = function (x, y, z) {
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
    };
    DataStorage.prototype.setMinX = function (x) {
        this.mMinX = x;
    };
    DataStorage.prototype.getMinX = function () {
        return this.mMinX;
    };
    DataStorage.prototype.setMinY = function (y) {
        this.mMinY = y;
    };
    DataStorage.prototype.getMinY = function () {
        return this.mMinY;
    };
    DataStorage.prototype.setMinZ = function (z) {
        this.mMinZ = z;
    };
    DataStorage.prototype.getMinZ = function () {
        return this.mMinZ;
    };
    DataStorage.prototype.setMaxX = function (x) {
        this.mMaxX = x;
    };
    DataStorage.prototype.getMaxX = function () {
        return this.mMaxX;
    };
    DataStorage.prototype.setMaxY = function (y) {
        this.mMaxY = y;
    };
    DataStorage.prototype.getMaxY = function () {
        return this.mMaxY;
    };
    DataStorage.prototype.setMaxZ = function (z) {
        this.mMaxZ = z;
    };
    DataStorage.prototype.getMaxZ = function () {
        return this.mMaxZ;
    };
    DataStorage.prototype.setPathFile = function (path) {
        this.mPath = path;
    };
    DataStorage.prototype.getPathFile = function () {
        return this.mPath;
    };
    DataStorage.prototype.setPathSnapshot = function (path) {
        this.mPathSnapshot = path;
    };
    DataStorage.prototype.getPathSnapshot = function () {
        return this.mPathSnapshot;
    };
    DataStorage.prototype.setLastCenter = function (p) {
        this.mLastCenter = p;
    };
    DataStorage.prototype.getTrueCenter = function () {
        var x = (this.mMaxX + this.mMinX) / 2;
        var y = (this.mMaxY + this.mMinY) / 2;
        var z = (this.mMaxZ + this.mMinZ) / 2;
        return new Point_1.Point(x, y, z);
    };
    DataStorage.prototype.getLastCenter = function () {
        return this.mLastCenter;
    };
    DataStorage.prototype.setRotationMatrix = function (m) {
        for (var i = 0; i < this.mRotationMatrix.length; i++) {
            this.mRotationMatrix[i] = m[i];
        }
    };
    DataStorage.prototype.getRotationMatrix = function () {
        return this.mRotationMatrix;
    };
    DataStorage.prototype.setModelMatrix = function (m) {
        for (var i = 0; i < this.mModelMatrix.length; i++) {
            this.mModelMatrix[i] = m[i];
        }
    };
    DataStorage.prototype.getModelMatrix = function () {
        return this.mModelMatrix;
    };
    DataStorage.prototype.setLastScaleFactorX = function (f) {
        this.mLastScaleFactorX = f;
    };
    DataStorage.prototype.setLastScaleFactorY = function (f) {
        this.mLastScaleFactorY = f;
    };
    DataStorage.prototype.setLastScaleFactorZ = function (f) {
        this.mLastScaleFactorZ = f;
    };
    DataStorage.prototype.getLastScaleFactorX = function () {
        return this.mLastScaleFactorX;
    };
    DataStorage.prototype.getLastScaleFactorY = function () {
        return this.mLastScaleFactorY;
    };
    DataStorage.prototype.getLastScaleFactorZ = function () {
        return this.mLastScaleFactorZ;
    };
    DataStorage.prototype.setStateObject = function (state) {
        this.mStateObject = state;
    };
    DataStorage.prototype.getStateObject = function () {
        return this.mStateObject;
    };
    DataStorage.prototype.setAdjustZ = function (z) {
        this.mAdjustZ = z;
    };
    DataStorage.prototype.getAdjustZ = function () {
        return this.mAdjustZ;
    };
    return DataStorage;
}());
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
exports.DataStorage = DataStorage;
