"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var ViewerRenderer = (function () {
    function ViewerRenderer(dataList, state, mode) {
        this.mStlObjectList = [];
        this.mShowLeftWitboxFace = true;
        this.mShowRightWitboxFace = true;
        this.mShowBackWitboxFace = true;
        this.mShowDownWitboxFace = true;
        this.mShowFrontWitboxFace = true;
        this.mShowTopWitboxFace = true;
        this.final_matrix_R_Render = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.final_matrix_S_Render = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.final_matrix_T_Render = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mVPMatrix = function (d) {
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
        this.mProjectionMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mViewMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mRotationMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mTemporaryMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mMVMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mMVPMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mMVPObjectMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mMVObjectMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mTransInvMVMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mObjectModel = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mTemporaryModel = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mLightPosInModelSpace = [
            0.0,
            0.0,
            0.0,
            1.0
        ];
        this.mLightPosInEyeSpace = function (d) {
            // new float[4]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(4);
        this.mLightPosInWorldSpace = function (d) {
            // new float[4]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(4);
        this.mLightModelMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        this.mMode = 0;
        this.mObjectPressed = -1;
        this.mDx = ViewerRenderer.POSITION_DEFAULT_X;
        this.mDy = ViewerRenderer.POSITION_DEFAULT_Y;
        this.mScaleFactorX = 1.0;
        this.mScaleFactorY = 1.0;
        this.mScaleFactorZ = 1.0;
        this.mVector = new Vector(1, 0, 0);
        this.mAxis = -1;
        this.mDataList = dataList;
        this.mState = state;
        this.mMode = mode;
    }
    ViewerRenderer.prototype.showBackWitboxFace = function (draw) {
        this.mShowBackWitboxFace = draw;
    };
    ViewerRenderer.prototype.showRightWitboxFace = function (draw) {
        this.mShowRightWitboxFace = draw;
    };
    ViewerRenderer.prototype.showLeftWitboxFace = function (draw) {
        this.mShowLeftWitboxFace = draw;
    };
    ViewerRenderer.prototype.showDownWitboxFace = function (draw) {
        this.mShowDownWitboxFace = draw;
    };
    ViewerRenderer.prototype.getShowRightWitboxFace = function () {
        return this.mShowRightWitboxFace;
    };
    ViewerRenderer.prototype.getShowLeftWitboxFace = function () {
        return this.mShowLeftWitboxFace;
    };
    ViewerRenderer.prototype.getShowDownWitboxFace = function () {
        return this.mShowDownWitboxFace;
    };
    ViewerRenderer.prototype.getShowBackWitboxFace = function () {
        return this.mShowBackWitboxFace;
    };
    ViewerRenderer.prototype.setTransparent = function (transparent) {
        for (var i = 0; i < this.mStlObjectList.size(); i++)
            this.mStlObjectList.get(i).setTransparent(transparent);
    };
    ViewerRenderer.prototype.setXray = function (xray) {
        for (var i = 0; i < this.mStlObjectList.size(); i++)
            this.mStlObjectList.get(i).setXray(xray);
    };
    ViewerRenderer.prototype.setOverhang = function (overhang) {
        for (var i = 0; i < this.mStlObjectList.size(); i++)
            this.mStlObjectList.get(i).setOverhang(overhang);
    };
    ViewerRenderer.prototype.setRotationVector = function (vector) {
        this.mVector = vector;
    };
    ViewerRenderer.prototype.setCurrentaxis = function (axis) {
        this.mAxis = axis;
    };
    ViewerRenderer.prototype.setObjectPressed = function (i) {
        this.mObjectPressed = i;
    };
    ViewerRenderer.prototype.deleteObject = function (i) {
        if (!this.mDataList.isEmpty()) {
            this.mStlObjectList.remove(i);
            this.mDataList.remove(i);
            this.mObjectPressed = -1;
            this.changeTouchedState();
        }
    };
    ViewerRenderer.prototype.isStl = function () {
        if (this.mDataList.size() > 0)
            if (this.mDataList.get(0).getPathFile().endsWith(".stl") || this.mDataList.get(0).getPathFile().endsWith(".STL"))
                return true;
        return false;
    };
    ViewerRenderer.prototype.objectPressed = function (x, y) {
        var object = -1;
        if (this.mDataList != null && !this.mDataList.isEmpty()) {
            var ray = ViewerRenderer.convertNormalized2DPointToRay(x, y);
            for (var i = 0; i < this.mDataList.size(); i++) {
                var objectBox = new Box(this.mDataList.get(i).getMinX(), this.mDataList.get(i).getMaxX(), this.mDataList.get(i).getMinY(), this.mDataList.get(i).getMaxY(), this.mDataList.get(i).getMinZ(), this.mDataList.get(i).getMaxZ());
                if (
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.intersects(objectBox, ray)) {
                    object = i;
                    break;
                }
            }
        }
        if (this.mObjectPressed != object && object != -1)
            this.setObjectPressed(object);
        this.changeTouchedState();
        return object;
    };
    ViewerRenderer.prototype.changeTouchedState = function () {
        for (var i = 0; i < this.mDataList.size(); i++) {
            var d = this.mDataList.get(i);
            if (i == this.mObjectPressed) {
                if (!
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.isValidPosition(d.getMaxX(), d.getMinX(), d.getMaxY(), d.getMinY(), this.mDataList, i))
                    this.mDataList.get(i).setStateObject(ViewerRenderer.OUT_TOUCHED);
                else
                    this.mDataList.get(i).setStateObject(ViewerRenderer.INSIDE_TOUCHED);
            }
            else {
                if (!
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.isValidPosition(d.getMaxX(), d.getMinX(), d.getMaxY(), d.getMinY(), this.mDataList, i))
                    this.mDataList.get(i).setStateObject(ViewerRenderer.OUT_NOT_TOUCHED);
                else
                    this.mDataList.get(i).setStateObject(ViewerRenderer.INSIDE_NOT_TOUCHED);
            }
        }
    };
    ViewerRenderer.prototype.dragObject = function (x, y) {
        var ray = ViewerRenderer.convertNormalized2DPointToRay(x, y);
        var touched = 
        // TODO: Warning - no scope specified; assuming 'this'.
        this.Geometry.intersectionPointWitboxPlate(ray);
        var data = this.mDataList.get(this.mObjectPressed);
        var dx = touched.x - data.getLastCenter().x;
        var dy = touched.y - data.getLastCenter().y;
        var maxX = data.getMaxX() + dx;
        var maxY = data.getMaxY() + dy;
        var minX = data.getMinX() + dx;
        var minY = data.getMinY() + dy;
        if (maxX > this.mPlate[0] + data.getLong() || minX < -this.mPlate[0] - data.getLong() || maxY > this.mPlate[1] + data.getWidth() || minY < -this.mPlate[1] - data.getWidth()) {
            return;
        }
        else {
            this.mDataList.get(this.mObjectPressed).setLastCenter(new Point(touched.x, touched.y, data.getLastCenter().z));
            data.setMaxX(maxX);
            data.setMaxY(maxY);
            data.setMinX(minX);
            data.setMinY(minY);
            var finalx = 0;
            var finaly = 0;
            var i = 0;
            for (var _i = 0, _a = this.mDataList; _i < _a.length; _i++) {
                var element = _a[_i];
                finalx = element.getLastCenter().x;
                finaly = element.getLastCenter().y;
                i++;
            }
            finalx = finalx / i;
            finaly = finaly / i;
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.setSlicingPosition(finalx, finaly);
        }
    };
    ViewerRenderer.prototype.scaleObject = function (fx, fy, fz, error) {
        if (Math.abs(fx) < 10 && Math.abs(fy) < 10 && Math.abs(fz) < 10) {
            this.mScaleFactorX = fx;
            this.mScaleFactorY = fy;
            this.mScaleFactorZ = fz;
            var data = this.mDataList.get(this.mObjectPressed);
            var lastCenter = data.getLastCenter();
            var maxX = data.getMaxX() - lastCenter.x;
            var maxY = data.getMaxY() - lastCenter.y;
            var maxZ = data.getMaxZ();
            var minX = data.getMinX() - lastCenter.x;
            var minY = data.getMinY() - lastCenter.y;
            var minZ = data.getMinZ();
            var lastScaleFactorX = data.getLastScaleFactorX();
            var lastScaleFactorY = data.getLastScaleFactorY();
            var lastScaleFactorZ = data.getLastScaleFactorZ();
            maxX = (maxX + (Math.abs(this.mScaleFactorX) - Math.abs(lastScaleFactorX)) * (maxX / Math.abs(lastScaleFactorX))) + lastCenter.x;
            maxY = (maxY + (this.mScaleFactorY - lastScaleFactorY) * (maxY / lastScaleFactorY)) + lastCenter.y;
            maxZ = (maxZ + (this.mScaleFactorZ - lastScaleFactorZ) * (maxZ / lastScaleFactorZ)) + lastCenter.z;
            minX = (minX + (Math.abs(this.mScaleFactorX) - Math.abs(lastScaleFactorX)) * (minX / Math.abs(lastScaleFactorX))) + lastCenter.x;
            minY = (minY + (this.mScaleFactorY - lastScaleFactorY) * (minY / lastScaleFactorY)) + lastCenter.y;
            minZ = (minZ + (this.mScaleFactorZ - lastScaleFactorZ) * (minZ / lastScaleFactorZ)) + lastCenter.z;
            if (maxX > this.mPlate[0] || minX < -this.mPlate[0] || maxY > this.mPlate[1] || minY < -this.mPlate[1]) {
                if (error) {
                    if (maxX > this.mPlate[0] || minX < -this.mPlate[0])
                        // TODO: Warning - no scope specified; assuming 'this'.
                        this.ViewerMainFragment.displayErrorInAxis(0);
                    if (maxY > this.mPlate[1] || minY < -this.mPlate[1])
                        // TODO: Warning - no scope specified; assuming 'this'.
                        this.ViewerMainFragment.displayErrorInAxis(1);
                }
                return;
            }
            else {
                data.setMaxX(maxX);
                data.setMaxY(maxY);
                data.setMaxZ(maxZ);
                data.setMinX(minX);
                data.setMinY(minY);
                data.setMinZ(minZ);
                data.setLastScaleFactorX(this.mScaleFactorX);
                data.setLastScaleFactorY(this.mScaleFactorY);
                data.setLastScaleFactorZ(this.mScaleFactorZ);
            }
        }
    };
    ViewerRenderer.prototype.setRotationObject = function (angle) {
        var data = this.mDataList.get(this.mObjectPressed);
        var rotateObjectMatrix = data.getRotationMatrix();
        var center = data.getLastCenter();
        var mTemporaryMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        var mFinalMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        Matrix.setIdentityM(mTemporaryMatrix, 0);
        Matrix.translateM(mTemporaryMatrix, 0, 0.0, 0.0, 0.0);
        Matrix.rotateM(mTemporaryMatrix, 0, angle, this.mVector.x, this.mVector.y, this.mVector.z);
        Matrix.multiplyMM(mFinalMatrix, 0, mTemporaryMatrix, 0, rotateObjectMatrix, 0);
        data.setRotationMatrix(mFinalMatrix);
    };
    ViewerRenderer.prototype.refreshRotatedObjectCoordinates = function () {
        var task = new AsyncTask(), _a = void 0, _b = _a.protected, protected = _b === void 0 ? onPreExecute() : _b, _c = _a.void, 
        // TODO: Warning - no scope specified; assuming 'this'.
         = _c.this, ViewerMainFragment = _c.ViewerMainFragment, _d = _c.configureProgressState, configureProgressState = _d === void 0 ? (View.VISIBLE) : _d;
    };
    ViewerRenderer.prototype.doInBackground = function (params) {
        try {
            var data = this.mDataList.get(this.mObjectPressed);
            data.initMaxMin();
            var coordinatesArray = data.getVertexArray();
            // TODO: Warning - declaring multiple variables with the same statement may not be supported.let x: number;
            var y = void 0;
            var z = void 0;
            var vector = function (d) {
                // new float[4]
                // TODO: Consider refactoring this array initialization to be more readable.
                var r = [];
                for (var i = 0; i < d; i++)
                    r.push(0);
                return r;
            }(4);
            var result = function (d) {
                // new float[4]
                // TODO: Consider refactoring this array initialization to be more readable.
                var r = [];
                for (var i = 0; i < d; i++)
                    r.push(0);
                return r;
            }(4);
            var aux = function (d) {
                // new float[16]
                // TODO: Consider refactoring this array initialization to be more readable.
                var r = [];
                for (var i = 0; i < d; i++)
                    r.push(0);
                return r;
            }(16);
            var rotationMatrix = data.getRotationMatrix();
            for (var i = 0; i < coordinatesArray.length; i = 3) {
                vector[0] = coordinatesArray[i];
                vector[1] = coordinatesArray[i + 1];
                vector[2] = coordinatesArray[i + 2];
                Matrix.setIdentityM(aux, 0);
                Matrix.multiplyMM(aux, 0, rotationMatrix, 0, aux, 0);
                Matrix.multiplyMV(result, 0, aux, 0, vector, 0);
                x = result[0];
                y = result[1];
                z = result[2];
                data.adjustMaxMin(x, y, z);
            }
            var maxX = data.getMaxX();
            var minX = data.getMinX();
            var minY = data.getMinY();
            var maxY = data.getMaxY();
            var maxZ = data.getMaxZ();
            var minZ = data.getMinZ();
            var lastCenter = data.getLastCenter();
            maxX = maxX * Math.abs(this.mScaleFactorX) + lastCenter.x;
            maxY = maxY * this.mScaleFactorY + lastCenter.y;
            maxZ = maxZ * this.mScaleFactorZ + lastCenter.z;
            minX = minX * Math.abs(this.mScaleFactorX) + lastCenter.x;
            minY = minY * this.mScaleFactorY + lastCenter.y;
            minZ = minZ * this.mScaleFactorZ + lastCenter.z;
            data.setMaxX(maxX);
            data.setMaxY(maxY);
            data.setMinX(minX);
            data.setMinY(minY);
            var adjustZ = 0;
            if (minZ != 0)
                adjustZ = -data.getMinZ() + (number);
            // TODO: Warning - no scope specified; assuming 'this'.
            this.DataStorage.MIN_Z;
            data.setAdjustZ(adjustZ);
            data.setMinZ(minZ + adjustZ);
            data.setMaxZ(maxZ + adjustZ);
        }
        catch (e) {
            if (e instanceof ArrayIndexOutOfBoundsException) {
                // TODO: Warning - no scope specified; assuming 'this'.
                this.e.printStackTrace();
            }
        }
        return null;
    };
    ViewerRenderer.prototype.onPostExecute = function (unused) {
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerMainFragment.configureProgressState(View.GONE);
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerMainFragment.displayModelSize(this.mObjectPressed);
    };
    return ViewerRenderer;
}());
ViewerRenderer.TAG = "ViewerRenderer";
ViewerRenderer.Z_NEAR = 1;
ViewerRenderer.Z_FAR = 3000;
ViewerRenderer.OFFSET_HEIGHT = 2;
ViewerRenderer.OFFSET_BIG_HEIGHT = 5;
ViewerRenderer.ANGLE_X = 0;
ViewerRenderer.ANGLE_Y = -5;
ViewerRenderer.CAMERA_DEFAULT_X = 0;
ViewerRenderer.CAMERA_DEFAULT_Y = -300;
ViewerRenderer.CAMERA_DEFAULT_Z = 350;
ViewerRenderer.POSITION_DEFAULT_X = 0;
ViewerRenderer.POSITION_DEFAULT_Y = -50;
ViewerRenderer.mCameraX = 0;
ViewerRenderer.mCameraY = 0;
ViewerRenderer.mCameraZ = 0;
ViewerRenderer.mCenterX = 0;
ViewerRenderer.mCenterY = 0;
ViewerRenderer.mCenterZ = 0;
ViewerRenderer.mSceneAngleX = 0;
ViewerRenderer.mSceneAngleY = 0;
ViewerRenderer.mCurrentSceneAngleX = 0;
ViewerRenderer.mCurrentSceneAngleY = 0;
ViewerRenderer.RED = 0.80;
ViewerRenderer.GREEN = 0.1;
ViewerRenderer.BLUE = 0.1;
ViewerRenderer.ALPHA = 0.9;
ViewerRenderer.DOWN = 0;
ViewerRenderer.RIGHT = 1;
ViewerRenderer.BACK = 2;
ViewerRenderer.LEFT = 3;
ViewerRenderer.FRONT = 4;
ViewerRenderer.TOP = 5;
ViewerRenderer.LIGHT_X = 0;
ViewerRenderer.LIGHT_Y = 0;
ViewerRenderer.LIGHT_Z = 2000;
ViewerRenderer.NORMAL = 0;
ViewerRenderer.XRAY = 1;
ViewerRenderer.TRANSPARENT = 2;
ViewerRenderer.LAYERS = 3;
ViewerRenderer.invertedMVPMatrix = function (d) {
    // new float[16]
    // TODO: Consider refactoring this array initialization to be more readable.
    var r = [];
    for (var i = 0; i < d; i++)
        r.push(0);
    return r;
}(16);
ViewerRenderer.INSIDE_NOT_TOUCHED = 0;
ViewerRenderer.OUT_NOT_TOUCHED = 1;
ViewerRenderer.INSIDE_TOUCHED = 2;
ViewerRenderer.OUT_TOUCHED = 3;
exports.ViewerRenderer = ViewerRenderer;
;
task.execute();
convertNormalized2DPointToRay(normalizedX, number, normalizedY, number);
Ray;
{
    var nearPointNdc = [
        normalizedX,
        normalizedY,
        -1,
        1
    ];
    var farPointNdc = [
        normalizedX,
        normalizedY,
        1,
        1
    ];
    var nearPointWorld = function (d) {
        // new float[4]
        // TODO: Consider refactoring this array initialization to be more readable.
        var r = [];
        for (var i = 0; i < d; i++)
            r.push(0);
        return r;
    }(4);
    var farPointWorld = function (d) {
        // new float[4]
        // TODO: Consider refactoring this array initialization to be more readable.
        var r = [];
        for (var i = 0; i < d; i++)
            r.push(0);
        return r;
    }(4);
    Matrix.multiplyMV(nearPointWorld, 0, ViewerRenderer.invertedMVPMatrix, 0, nearPointNdc, 0);
    Matrix.multiplyMV(farPointWorld, 0, ViewerRenderer.invertedMVPMatrix, 0, farPointNdc, 0);
    ViewerRenderer.divideByW(nearPointWorld);
    ViewerRenderer.divideByW(farPointWorld);
    var nearPointRay = new Point(nearPointWorld[0], nearPointWorld[1], nearPointWorld[2]);
    var farPointRay = new Point(farPointWorld[0], farPointWorld[1], farPointWorld[2]);
    return new Ray(nearPointRay, 
    // TODO: Warning - no scope specified; assuming 'this'.
    this.Geometry.vectorBetween(nearPointRay, farPointRay));
}
divideByW(vector, number[]);
void {
    vector: (_a = vector[3], 0 = _a[0], _a),
    vector: (_b = vector[3], 1 = _b[0], _b),
    vector: (_c = vector[3], 2 = _c[0], _c)
};
getWidthScreen();
number;
{
    return ViewerRenderer.mWidth;
}
getHeightScreen();
number;
{
    return ViewerRenderer.mHeight;
}
setColor(object, number);
void {
    let: stl,
    // TODO: Warning - type not found in scope.
    StlObject: StlObject,
    switch: function (mDataList, get) {
        if (get === void 0) { get = (object).getStateObject(); }
    },
    case: ViewerRenderer.INSIDE_NOT_TOUCHED,
    stl: .setColor(
    // TODO: Warning - no scope specified; assuming 'this'.
    this.StlObject.colorNormal),
    break: ,
    case: ViewerRenderer.INSIDE_TOUCHED,
    stl: .setColor(
    // TODO: Warning - no scope specified; assuming 'this'.
    this.StlObject.colorSelectedObject),
    break: ,
    case: ViewerRenderer.OUT_NOT_TOUCHED,
    stl: .setColor(
    // TODO: Warning - no scope specified; assuming 'this'.
    this.StlObject.colorObjectOut),
    break: ,
    case: ViewerRenderer.OUT_TOUCHED,
    stl: .setColor(
    // TODO: Warning - no scope specified; assuming 'this'.
    this.StlObject.colorObjectOutTouched),
    break: 
};
generatePlate(type, number[]);
void {
    try: {
        this: .mPlate = type,
        if: function (mMode) {
            if (mMode === void 0) { mMode =  ==
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.PRINT_PREVIEW; }
            this.mWitboxFaceBack = new 
            // TODO: Warning - type not found in scope.
            WitboxFaces(ViewerRenderer.BACK, this.mPlate);
            this.mWitboxFaceRight = new 
            // TODO: Warning - type not found in scope.
            WitboxFaces(ViewerRenderer.RIGHT, this.mPlate);
            this.mWitboxFaceLeft = new 
            // TODO: Warning - type not found in scope.
            WitboxFaces(ViewerRenderer.LEFT, this.mPlate);
            this.mWitboxFaceFront = new 
            // TODO: Warning - type not found in scope.
            WitboxFaces(ViewerRenderer.FRONT, this.mPlate);
            this.mWitboxFaceTop = new 
            // TODO: Warning - type not found in scope.
            WitboxFaces(ViewerRenderer.TOP, this.mPlate);
            this.mWitboxFaceDown = new 
            // TODO: Warning - type not found in scope.
            WitboxPlate(this.mContext, false, this.mPlate);
        },
        this: .mWitboxFaceBack.generatePlaneCoords(ViewerRenderer.BACK, type),
        this: .mWitboxFaceRight.generatePlaneCoords(ViewerRenderer.RIGHT, type),
        this: .mWitboxFaceLeft.generatePlaneCoords(ViewerRenderer.LEFT, type),
        this: .mWitboxFaceFront.generatePlaneCoords(ViewerRenderer.FRONT, type),
        this: .mWitboxFaceTop.generatePlaneCoords(ViewerRenderer.TOP, type),
        this: .mWitboxFaceDown.generatePlaneCoords(type, false)
    }, catch: function (e) {
        if (e instanceof NullPointerException) {
            // TODO: Warning - no scope specified; assuming 'this'.
            this.e.printStackTrace();
        }
    }
};
onSurfaceCreated(unused, GL10, config, EGLConfig);
void {
    GLES20: .glClearColor(0.149, 0.196, 0.22, 1.0),
    GLES20: .glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT),
    Matrix: .setIdentityM(this.mModelMatrix, 0),
    ViewerRenderer: .mCurrentSceneAngleX = 0,
    ViewerRenderer: .mCurrentSceneAngleY = 0,
    ViewerRenderer: .mSceneAngleX = ViewerRenderer.ANGLE_X,
    ViewerRenderer: .mSceneAngleY = ViewerRenderer.ANGLE_Y,
    if: function (mDataList, size) {
        if (size === void 0) { size = () > 0; }
    }, if: function (isStl) {
        if (isStl === void 0) { isStl = (); }
        this.mStlObjectList.clear();
        for (var i = 0; i < this.mDataList.size(); i++) {
            if (this.mDataList.get(i).getVertexArray() != null) {
                Log.i("VERTEX", "adding");
                this.mStlObjectList.add(new 
                // TODO: Warning - type not found in scope.
                StlObject(this.mDataList.get(i), this.mContext, this.mState));
            }
            else
                Log.i("VERTEX", "ONE NULL " + i);
        }
    }, else: , if: function (mDataList, size) {
        if (size === void 0) { size = () > 0; }
        try {
            this.mGcodeObject = new 
            // TODO: Warning - type not found in scope.
            GcodeObject(this.mDataList.get(0), this.mContext);
        }
        catch (e) {
            if (e instanceof NullPointerException) {
                // TODO: Warning - no scope specified; assuming 'this'.
                this.e.printStackTrace();
            }
        }
    },
    if: function (mMode) {
        if (mMode === void 0) { mMode =  ==
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT || this.mMode ==
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.PRINT_PREVIEW; }
    }, this: .mInfinitePlane = new 
    // TODO: Warning - type not found in scope.
    WitboxPlate(this.mContext, true, 
    // TODO: Warning - no scope specified; assuming 'this'.
    this.ViewerMainFragment.getCurrentPlate()),
    this: .mWitboxFaceBack = new 
    // TODO: Warning - type not found in scope.
    WitboxFaces(ViewerRenderer.BACK, this.mPlate),
    this: .mWitboxFaceRight = new 
    // TODO: Warning - type not found in scope.
    WitboxFaces(ViewerRenderer.RIGHT, this.mPlate),
    this: .mWitboxFaceLeft = new 
    // TODO: Warning - type not found in scope.
    WitboxFaces(ViewerRenderer.LEFT, this.mPlate),
    this: .mWitboxFaceFront = new 
    // TODO: Warning - type not found in scope.
    WitboxFaces(ViewerRenderer.FRONT, this.mPlate),
    this: .mWitboxFaceTop = new 
    // TODO: Warning - type not found in scope.
    WitboxFaces(ViewerRenderer.TOP, this.mPlate),
    this: .mWitboxFaceDown = new 
    // TODO: Warning - type not found in scope.
    WitboxPlate(this.mContext, false, this.mPlate),
    this: .mCircle = new 
    // TODO: Warning - type not found in scope.
    Circles()
};
onSurfaceChanged(unused, GL10, width, number, height, number);
void {
    ViewerRenderer: .mWidth = width,
    ViewerRenderer: .mHeight = height,
    Log: .i("OUT", "Width: " + width + " ; Height: " + height),
    GLES20: .glViewport(0, 0, width, height),
    let: ratio, number: number, width: / height;,
    Matrix: .perspectiveM(this.mProjectionMatrix, 0, 45, ratio, ViewerRenderer.Z_NEAR, ViewerRenderer.Z_FAR),
    if: function (mMode) {
        if (mMode === void 0) { mMode =  ==
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT || this.mMode ==
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.PRINT_PREVIEW; }
        var data = this.mDataList.get(0);
        var h = data.getHeight();
        var l = data.getLong();
        var w = data.getWidth();
        l = l / ratio;
        w = w / ratio;
        var dh = (number)(h / (Math.tan(Math.toRadians(45 / 2))));
        var dl = (number)(l / (2 * Math.tan(Math.toRadians(45 / 2))));
        var dw = (number)(w / (2 * Math.tan(Math.toRadians(45 / 2))));
        if (dw > dh && dw > dl)
            ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_BIG_HEIGHT * h;
        else if (dh > dl)
            ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_HEIGHT * h;
        else
            ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_BIG_HEIGHT * h;
        dl = dl + Math.abs(data.getMinY());
        dw = dw + Math.abs(data.getMinX());
        if (dw > dh && dw > dl)
            ViewerRenderer.mCameraY = -dw;
        else if (dh > dl)
            ViewerRenderer.mCameraY = -dh;
        else
            ViewerRenderer.mCameraY = -dl;
        this.mDx = -data.getLastCenter().x;
        this.mDy = -data.getLastCenter().y;
        ViewerRenderer.mSceneAngleX = -40;
        ViewerRenderer.mSceneAngleY = 0;
    }, else: {
        ViewerRenderer: .mCameraY = ViewerRenderer.CAMERA_DEFAULT_Y,
        ViewerRenderer: .mCameraZ = ViewerRenderer.CAMERA_DEFAULT_Z
    }
};
matrixTranslate(x, number, y, number, z, number);
void {
    this: .mDx = x,
    this: .mDy = y,
    if: function () { }
}(this.mDx < -300) || (this.mDx > 300);
this.mDx = x;
if ((this.mDy < -250) || (this.mDy > 250))
    this.mDy = y;
this.mViewMatrix[14] = z;
onDrawFrame(unused, GL10);
void {
    GLES20: .glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT),
    if: function (isStl) {
        if (isStl === void 0) { isStl = (); }
    }, for: function (let, number, i, i) {
        if (let === void 0) { let = i; }
        if (number === void 0) { number = 0; }
        if (i === void 0) { i = .mStlObjectList.size(); }
        if (i === void 0) { i = ++; }
    }, this: .setColor(i),
    GLES20: .glEnable(GLES20.GL_BLEND),
    GLES20: .glEnable(GLES20.GL_DEPTH_TEST),
    Matrix: .setLookAtM(this.mViewMatrix, 0, ViewerRenderer.mCameraX, ViewerRenderer.mCameraY, ViewerRenderer.mCameraZ, ViewerRenderer.mCenterX, ViewerRenderer.mCenterY, ViewerRenderer.mCenterZ, 0, 0.0, 1.0),
    this: .mViewMatrix[12] = this.mDx,
    this: .mViewMatrix[13] = this.mDy,
    Matrix: .multiplyMM(this.mVPMatrix, 0, this.mProjectionMatrix, 0, this.mViewMatrix, 0),
    Matrix: .setIdentityM(this.mRotationMatrix, 0),
    Matrix: .translateM(this.mRotationMatrix, 0, 0.0, 0.0, 0.0),
    Matrix: .rotateM(this.mRotationMatrix, 0, ViewerRenderer.mSceneAngleX, 0.0, 0.0, 1.0),
    ViewerRenderer: .mCurrentSceneAngleX = ViewerRenderer.mSceneAngleX,
    ViewerRenderer: .mSceneAngleX = 0,
    Matrix: .multiplyMM(this.mTemporaryMatrix, 0, this.mModelMatrix, 0, this.mRotationMatrix, 0),
    System: .arraycopy(this.mTemporaryMatrix, 0, this.mModelMatrix, 0, 16),
    Matrix: .setIdentityM(this.mRotationMatrix, 0),
    Matrix: .translateM(this.mRotationMatrix, 0, 0.0, 0.0, 0.0),
    Matrix: .rotateM(this.mRotationMatrix, 0, ViewerRenderer.mSceneAngleY, 1.0, 0.0, 0.0),
    ViewerRenderer: .mCurrentSceneAngleY = ViewerRenderer.mSceneAngleY,
    ViewerRenderer: .mSceneAngleY = 0,
    if: function (ViewerRenderer, mCurrentSceneAngleX) {
        if (mCurrentSceneAngleX === void 0) { mCurrentSceneAngleX =  > 180; }
    }, ViewerRenderer: .mCurrentSceneAngleX = 360, else: , if: function (ViewerRenderer, mCurrentSceneAngleX) {
        if (mCurrentSceneAngleX === void 0) { mCurrentSceneAngleX = ; }
    }, ViewerRenderer: .mCurrentSceneAngleX = 360,
    if: function (ViewerRenderer, mCurrentSceneAngleY) {
        if (mCurrentSceneAngleY === void 0) { mCurrentSceneAngleY =  > 180; }
    }, ViewerRenderer: .mCurrentSceneAngleY = 360, else: , if: function (ViewerRenderer, mCurrentSceneAngleY) {
        if (mCurrentSceneAngleY === void 0) { mCurrentSceneAngleY = ; }
    }, ViewerRenderer: .mCurrentSceneAngleY = 360,
    Matrix: .multiplyMM(this.mTemporaryMatrix, 0, this.mRotationMatrix, 0, this.mModelMatrix, 0),
    System: .arraycopy(this.mTemporaryMatrix, 0, this.mModelMatrix, 0, 16),
    Matrix: .multiplyMM(this.mMVPMatrix, 0, this.mVPMatrix, 0, this.mModelMatrix, 0),
    Matrix: .multiplyMM(this.mMVMatrix, 0, this.mViewMatrix, 0, this.mModelMatrix, 0),
    Matrix: .invertM(ViewerRenderer.invertedMVPMatrix, 0, this.mMVPMatrix, 0),
    Matrix: .setIdentityM(this.mLightModelMatrix, 0),
    Matrix: .translateM(this.mLightModelMatrix, 0, ViewerRenderer.LIGHT_X, ViewerRenderer.LIGHT_Y, ViewerRenderer.LIGHT_Z),
    Matrix: .multiplyMV(this.mLightPosInWorldSpace, 0, this.mLightModelMatrix, 0, this.mLightPosInModelSpace, 0),
    Matrix: .multiplyMV(this.mLightPosInEyeSpace, 0, this.mViewMatrix, 0, this.mLightPosInWorldSpace, 0),
    if: function (mDataList, size) {
        if (size === void 0) { size = () > 0; }
        if (this.mObjectPressed != -1) {
            if (this.mObjectPressed < this.mDataList.size()) {
                var data = this.mDataList.get(this.mObjectPressed);
                var center = data.getLastCenter();
                Log.i("CENTER", "Settings center @" + center.x + ";" + center.y + ";" + center.z);
                Matrix.setIdentityM(this.mTemporaryModel, 0);
                Matrix.translateM(this.mTemporaryModel, 0, center.x, center.y, center.z);
                Matrix.scaleM(this.mTemporaryModel, 0, data.getLastScaleFactorX(), data.getLastScaleFactorY(), data.getLastScaleFactorZ());
                Matrix.translateM(this.mTemporaryModel, 0, 0, 0, data.getAdjustZ());
                var rotateObjectMatrix = data.getRotationMatrix();
                Matrix.multiplyMM(this.mObjectModel, 0, this.mTemporaryModel, 0, rotateObjectMatrix, 0);
                Matrix.multiplyMM(this.mMVPObjectMatrix, 0, this.mMVPMatrix, 0, this.mObjectModel, 0);
                Matrix.multiplyMM(this.mMVObjectMatrix, 0, this.mMVMatrix, 0, this.mObjectModel, 0);
                Matrix.transposeM(this.mTransInvMVMatrix, 0, this.mMVObjectMatrix, 0);
                Matrix.invertM(this.mTransInvMVMatrix, 0, this.mTransInvMVMatrix, 0);
            }
            else {
                Log.i("Multiply", "IndexOutOfBounds " + this.mObjectPressed);
            }
        }
        if (this.isStl())
            for (var i = 0; i < this.mStlObjectList.size(); i++) {
                if (i == this.mObjectPressed) {
                    try {
                        if (this.mDataList.size() > 0) {
                            this.mDataList.get(this.mObjectPressed).setModelMatrix(this.mObjectModel);
                            this.mStlObjectList.get(this.mObjectPressed).draw(this.mMVPObjectMatrix, this.mTransInvMVMatrix, this.mLightPosInEyeSpace, this.mObjectModel);
                            this.mCircle.draw(this.mDataList.get(this.mObjectPressed), this.mMVPMatrix, this.mAxis);
                        }
                    }
                    catch (e) {
                        if (e instanceof IndexOutOfBoundsException) {
                            Log.i("Slicer", "IndexOutOfBounds " + this.mObjectPressed);
                        }
                    }
                }
                else {
                    var modelMatrix = this.mDataList.get(i).getModelMatrix();
                    var mvpMatrix = function (d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        var r = [];
                        for (var i_1 = 0; i_1 < d; i_1++)
                            r.push(0);
                        return r;
                    }(16);
                    var mvMatrix = function (d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        var r = [];
                        for (var i_2 = 0; i_2 < d; i_2++)
                            r.push(0);
                        return r;
                    }(16);
                    var mvFinalMatrix = function (d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        var r = [];
                        for (var i_3 = 0; i_3 < d; i_3++)
                            r.push(0);
                        return r;
                    }(16);
                    Matrix.multiplyMM(mvpMatrix, 0, this.mMVPMatrix, 0, modelMatrix, 0);
                    Matrix.multiplyMM(mvMatrix, 0, this.mMVMatrix, 0, modelMatrix, 0);
                    Matrix.transposeM(mvFinalMatrix, 0, mvMatrix, 0);
                    Matrix.invertM(mvFinalMatrix, 0, mvFinalMatrix, 0);
                    this.mStlObjectList.get(i).draw(mvpMatrix, mvFinalMatrix, this.mLightPosInEyeSpace, modelMatrix);
                }
            }
        else {
            try {
                if (this.mGcodeObject != null)
                    this.mGcodeObject.draw(this.mMVPMatrix);
            }
            catch (e) {
                if (e instanceof NullPointerException) {
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.e.printStackTrace();
                }
            }
        }
    },
    if: function (mMode) {
        if (mMode === void 0) { mMode =  ==
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT; }
        this.mInfinitePlane.draw(this.mMVPMatrix, this.mMVMatrix);
        this.takeSnapshot(unused);
    }, else: {
        if: function (mShowDownWitboxFace) { }, this: .mWitboxFaceDown.draw(this.mMVPMatrix, this.mMVMatrix),
        if: function (mShowBackWitboxFace) { }, this: .mWitboxFaceBack.draw(this.mMVPMatrix),
        if: function (mShowRightWitboxFace) { }, this: .mWitboxFaceRight.draw(this.mMVPMatrix),
        if: function (mShowLeftWitboxFace) { }, this: .mWitboxFaceLeft.draw(this.mMVPMatrix),
        if: function (mShowFrontWitboxFace) { }, this: .mWitboxFaceFront.draw(this.mMVPMatrix),
        if: function (mShowTopWitboxFace) { }, this: .mWitboxFaceTop.draw(this.mMVPMatrix)
    }
};
takeSnapshot(unused, GL10);
void {
    Log: .i(ViewerRenderer.TAG, "TAKING SNAPSHOT"),
    let: minX, number: number,
    let: minY, number: number,
    let: screenshotSize, number: number,
    let: bb, ByteBuffer: ByteBuffer,
    bb: .order(ByteOrder.nativeOrder()),
    GLES20: .glReadPixels(minX, minY, ViewerRenderer.mWidth, ViewerRenderer.mHeight, GLES20.GL_RGBA, GLES20.GL_UNSIGNED_BYTE, bb),
    LibraryModelCreation: .saveSnapshot(ViewerRenderer.mWidth, ViewerRenderer.mHeight, bb)
};
setSceneAngleX(x, number);
void {
    ViewerRenderer: .mSceneAngleX = x
};
setSceneAngleY(y, number);
void {
    ViewerRenderer: .mSceneAngleY = y
};
setCameraPosX(x, number);
void {
    ViewerRenderer: .mCameraX = x
};
setCameraPosY(y, number);
void {
    ViewerRenderer: .mCameraY = y
};
setCameraPosZ(z, number);
void {
    ViewerRenderer: .mCameraZ = z
};
getCameraPosX();
number;
{
    return ViewerRenderer.mCameraX;
}
getCameraPosY();
number;
{
    return ViewerRenderer.mCameraY;
}
getCameraPosZ();
number;
{
    return ViewerRenderer.mCameraZ;
}
setCenterX(x, number);
void {
    ViewerRenderer: .mCenterX = x
};
setCenterY(y, number);
void {
    ViewerRenderer: .mCenterY = y
};
setCenterZ(z, number);
void {
    ViewerRenderer: .mCenterZ = z
};
setZNear(h, number);
void {
    let: ang, number: number,
    let: valor, number: number, Math: .tan(ang),
    ViewerRenderer: .Z_NEAR = valor * (h / 2)
};
loadShader(type, number, shaderCode, string);
number;
{
    var shader = GLES20.glCreateShader(type);
    GLES20.glShaderSource(shader, shaderCode);
    GLES20.glCompileShader(shader);
    return shader;
}
checkGlError(glOperation, string);
void {
    let: error, number: ,
    while: function () { }
}(error = GLES20.glGetError()) != GLES20.GL_NO_ERROR;
{
    Log.e(ViewerRenderer.TAG, glOperation + ": glError " + error);
    throw new RuntimeException(glOperation + ": glError " + error);
}
CAMERA_MIN_TRANSLATION_DISTANCE: number = 0.1;
CAMERA_MAX_ROTATION_DISTANCE: number = 5;
CAMERA_MIN_ROTATION_DISTANCE: number = 1;
POSITION_MIN_TRANSLATION_DISTANCE: number = 0.05;
restoreInitialCameraPosition(dx, number, dy, number, zoom, boolean, rotation, boolean);
boolean;
{
    var dyx = 0;
    if (!zoom)
        dyx = ViewerRenderer.POSITION_DEFAULT_Y;
    if ((number))
        this.mDx < (number)(ViewerRenderer.POSITION_DEFAULT_X - dx);
    this.mDx = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
    if ((number))
        this.mDx > (number)(ViewerRenderer.POSITION_DEFAULT_X - dx);
    this.mDx = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
    if ((number))
        this.mDy < (number)(dyx - dy);
    this.mDy = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
    if ((number))
        this.mDy > (number)(dyx - dy);
    this.mDy = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
    if (!zoom) {
        if ((number))
            ViewerRenderer.mCameraX < ViewerRenderer.CAMERA_DEFAULT_X;
        ViewerRenderer.mCameraX = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        if ((number))
            ViewerRenderer.mCameraX > ViewerRenderer.CAMERA_DEFAULT_X;
        ViewerRenderer.mCameraX = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        if ((number))
            ViewerRenderer.mCameraY < ViewerRenderer.CAMERA_DEFAULT_Y;
        ViewerRenderer.mCameraY = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        if ((number))
            ViewerRenderer.mCameraY > ViewerRenderer.CAMERA_DEFAULT_Y;
        ViewerRenderer.mCameraY = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        if ((number))
            ViewerRenderer.mCameraZ < ViewerRenderer.CAMERA_DEFAULT_Z;
        ViewerRenderer.mCameraZ = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        if ((number))
            ViewerRenderer.mCameraZ > ViewerRenderer.CAMERA_DEFAULT_Z;
        ViewerRenderer.mCameraZ = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
    }
    if (rotation) {
        if ((number))
            ViewerRenderer.mCurrentSceneAngleX < ViewerRenderer.ANGLE_X;
        {
            if ((number))
                ViewerRenderer.mCurrentSceneAngleX > (ViewerRenderer.ANGLE_X - 10);
            ViewerRenderer.mSceneAngleX = ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE;
            ViewerRenderer.mSceneAngleX = ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
        }
        if ((number))
            ViewerRenderer.mCurrentSceneAngleX > ViewerRenderer.ANGLE_X;
        {
            if ((number))
                ViewerRenderer.mCurrentSceneAngleX < (ViewerRenderer.ANGLE_X + 10);
            ViewerRenderer.mSceneAngleX = -ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE;
            ViewerRenderer.mSceneAngleX = -ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
        }
        if ((number))
            ViewerRenderer.mCurrentSceneAngleY < ViewerRenderer.ANGLE_Y;
        {
            if ((number))
                ViewerRenderer.mCurrentSceneAngleY > (ViewerRenderer.ANGLE_Y - 10);
            ViewerRenderer.mSceneAngleY = ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE;
            ViewerRenderer.mSceneAngleY = ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
        }
        if ((number))
            ViewerRenderer.mCurrentSceneAngleY > ViewerRenderer.ANGLE_Y;
        {
            if ((number))
                ViewerRenderer.mCurrentSceneAngleY < (ViewerRenderer.ANGLE_Y + 10);
            ViewerRenderer.mSceneAngleY = -ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE;
            ViewerRenderer.mSceneAngleY = -ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
        }
    }
    if (((((number)))))
        ViewerRenderer.mCameraZ == ViewerRenderer.CAMERA_DEFAULT_Z;
     && ((number));
    ViewerRenderer.mCameraY == ViewerRenderer.CAMERA_DEFAULT_Y;
     && ((number));
    ViewerRenderer.mCameraX == ViewerRenderer.CAMERA_DEFAULT_X;
     || (zoom);
     && (((number)));
    ViewerRenderer.mCurrentSceneAngleX == ViewerRenderer.ANGLE_X;
     && ((number));
    ViewerRenderer.mCurrentSceneAngleY == ViewerRenderer.ANGLE_Y;
     || (!rotation);
     && ((number));
    this.mDx == (number)(ViewerRenderer.POSITION_DEFAULT_X - dx);
     && ((number));
    this.mDy == (number)(dyx - dy);
    return true;
    {
        return false;
    }
}
var _a, _b, _c;
