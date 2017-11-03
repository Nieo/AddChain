// package android.app.printerapp.viewer;

import { Log } from "./android/app/printerapp/Log";
import { LibraryModelCreation } from "./android/app/printerapp/library/LibraryModelCreation";
import { Box } from "./android/app/printerapp/viewer/Geometry/Box";
import { Point } from "./android/app/printerapp/viewer/Geometry/Point";
import { Ray } from "./android/app/printerapp/viewer/Geometry/Ray";
import { Vector } from "./android/app/printerapp/viewer/Geometry/Vector";
import { Context } from "./android/content/Context";
import { GLES20 } from "./android/opengl/GLES20";
import { GLSurfaceView } from "./android/opengl/GLSurfaceView";
import { Matrix } from "./android/opengl/Matrix";
import { AsyncTask } from "./android/os/AsyncTask";
import { View } from "./android/view/View";
import { ByteBuffer } from "./java/nio/ByteBuffer";
import { ByteOrder } from "./java/nio/ByteOrder";
import { ArrayList } from "./java/util/ArrayList";
import { List } from "./java/util/List";
import { EGLConfig } from "./javax/microedition/khronos/egl/EGLConfig";
import { GL10 } from "./javax/microedition/khronos/opengles/GL10";

export class ViewerRenderer {
    mContext: Context;

    private static TAG: string = "ViewerRenderer";

    public static Z_NEAR: number = 1;

    public static Z_FAR: number = 3000;

    private static OFFSET_HEIGHT: number = 2;

    private static OFFSET_BIG_HEIGHT: number = 5;

    private static readonly ANGLE_X: number = 0;

    private static readonly ANGLE_Y: number = -5;

    private static readonly CAMERA_DEFAULT_X: number = 0;

    private static readonly CAMERA_DEFAULT_Y: number = -300;

    private static readonly CAMERA_DEFAULT_Z: number = 350;

    private static readonly POSITION_DEFAULT_X: number = 0;

    private static readonly POSITION_DEFAULT_Y: number = -50;

    private static mWidth: number;

    private static mHeight: number;

    public static mCameraX: number = 0;

    public static mCameraY: number = 0;

    public static mCameraZ: number = 0;

    public static mCenterX: number = 0;

    public static mCenterY: number = 0;

    public static mCenterZ: number = 0;

    public static mSceneAngleX: number = 0;

    public static mSceneAngleY: number = 0;

    public static mCurrentSceneAngleX: number = 0;

    public static mCurrentSceneAngleY: number = 0;

    public static RED: number = 0.80;

    public static GREEN: number = 0.1;

    public static BLUE: number = 0.1;

    public static ALPHA: number = 0.9;

    public static readonly DOWN: number = 0;

    public static readonly RIGHT: number = 1;

    public static readonly BACK: number = 2;

    public static readonly LEFT: number = 3;

    public static readonly FRONT: number = 4;

    public static readonly TOP: number = 5;

    public static readonly LIGHT_X: number = 0;

    public static readonly LIGHT_Y: number = 0;

    public static readonly LIGHT_Z: number = 2000;

    public static readonly NORMAL: number = 0;

    public static readonly XRAY: number = 1;

    public static readonly TRANSPARENT: number = 2;

    public static readonly LAYERS: number = 3;

    private mState: number;

    private mStlObjectList: List<StlObject> = new ArrayList<StlObject>();

    private mGcodeObject: 
        // TODO: Warning - type not found in scope.
    GcodeObject;

    private mWitboxFaceDown: 
        // TODO: Warning - type not found in scope.
    WitboxPlate;

    private mWitboxFaceRight: 
        // TODO: Warning - type not found in scope.
    WitboxFaces;

    private mWitboxFaceBack: 
        // TODO: Warning - type not found in scope.
    WitboxFaces;

    private mWitboxFaceLeft: 
        // TODO: Warning - type not found in scope.
    WitboxFaces;

    private mWitboxFaceFront: 
        // TODO: Warning - type not found in scope.
    WitboxFaces;

    private mWitboxFaceTop: 
        // TODO: Warning - type not found in scope.
    WitboxFaces;

    private mInfinitePlane: 
        // TODO: Warning - type not found in scope.
    WitboxPlate;

    private mDataList: List<DataStorage>;

    private mShowLeftWitboxFace: boolean = true;

    private mShowRightWitboxFace: boolean = true;

    private mShowBackWitboxFace: boolean = true;

    private mShowDownWitboxFace: boolean = true;

    private mShowFrontWitboxFace: boolean = true;

    private mShowTopWitboxFace: boolean = true;

    public final_matrix_R_Render: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    public final_matrix_S_Render: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    public final_matrix_T_Render: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mVPMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mModelMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mProjectionMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mViewMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mRotationMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private readonly mTemporaryMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private static readonly invertedMVPMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mMVMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mMVPMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mMVPObjectMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mMVObjectMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mTransInvMVMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mObjectModel: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mTemporaryModel: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    mLightPosInModelSpace: number[] = [
        0.0,
        0.0,
        0.0,
        1.0
    ];

    mLightPosInEyeSpace: number[] = function(d) {
        // new float[4]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(4);

    mLightPosInWorldSpace: number[] = function(d) {
        // new float[4]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(4);

    mLightModelMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private mMode: number = 0;

    private mObjectPressed: number = -1;

    mDx: number = ViewerRenderer.POSITION_DEFAULT_X;

    mDy: number = ViewerRenderer.POSITION_DEFAULT_Y;

    mDz: number;

    private mScaleFactorX: number = 1.0;

    private mScaleFactorY: number = 1.0;

    private mScaleFactorZ: number = 1.0;

    private mVector: Vector = new Vector(
        1,
        0,
        0
    );

    public static readonly INSIDE_NOT_TOUCHED: number = 0;

    public static readonly OUT_NOT_TOUCHED: number = 1;

    public static readonly INSIDE_TOUCHED: number = 2;

    public static readonly OUT_TOUCHED: number = 3;

    private mCircle: 
        // TODO: Warning - type not found in scope.
    Circles;

    private mPlate: number[];

    private mAxis: number = -1;

    public constructor(
            dataList: List<DataStorage>,
            context: Context,
            state: number,
            mode: number) {
        this.mDataList = dataList;
        this.mContext = context;
        this.mState = state;
        this.mMode = mode;
        this.mPlate = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.getCurrentPlate();
    }

    public showBackWitboxFace(draw: boolean) : void {
        this.mShowBackWitboxFace = draw;
    }

    public showRightWitboxFace(draw: boolean) : void {
        this.mShowRightWitboxFace = draw;
    }

    public showLeftWitboxFace(draw: boolean) : void {
        this.mShowLeftWitboxFace = draw;
    }

    public showDownWitboxFace(draw: boolean) : void {
        this.mShowDownWitboxFace = draw;
    }

    public getShowRightWitboxFace() : boolean {
        return this.mShowRightWitboxFace;
    }

    public getShowLeftWitboxFace() : boolean {
        return this.mShowLeftWitboxFace;
    }

    public getShowDownWitboxFace() : boolean {
        return this.mShowDownWitboxFace;
    }

    public getShowBackWitboxFace() : boolean {
        return this.mShowBackWitboxFace;
    }

    public setTransparent(transparent: boolean) : void {
        for (let i: number = 0; i < this.mStlObjectList.size(); i++) this.mStlObjectList.get(i).setTransparent(transparent);
    }

    public setXray(xray: boolean) : void {
        for (let i: number = 0; i < this.mStlObjectList.size(); i++) this.mStlObjectList.get(i).setXray(xray);
    }

    public setOverhang(overhang: boolean) : void {
        for (let i: number = 0; i < this.mStlObjectList.size(); i++) this.mStlObjectList.get(i).setOverhang(overhang);
    }

    public setRotationVector(vector: Vector) : void {
        this.mVector = vector;
    }

    public setCurrentaxis(axis: number) : void {
        this.mAxis = axis;
    }

    public setObjectPressed(i: number) : void {
        this.mObjectPressed = i;
    }

    public deleteObject(i: number) : void {
        if (!this.mDataList.isEmpty()) {
            this.mStlObjectList.remove(i);
            this.mDataList.remove(i);
            this.mObjectPressed = -1;
            this.changeTouchedState();
        }
    }

    private isStl() : boolean {
        if (this.mDataList.size() > 0) if (this.mDataList.get(0).getPathFile().endsWith(".stl") || this.mDataList.get(0).getPathFile().endsWith(".STL")) return true;
        return false;
    }

    public objectPressed(
            x: number,
            y: number) : number {
        let object: number = -1;
        if (this.mDataList != null && !this.mDataList.isEmpty()) {
            let ray: Ray = ViewerRenderer.convertNormalized2DPointToRay(
                x,
                y
            );
            for (let i: number = 0; i < this.mDataList.size(); i++) {
                let objectBox: Box = new Box(
                    this.mDataList.get(i).getMinX(),
                    this.mDataList.get(i).getMaxX(),
                    this.mDataList.get(i).getMinY(),
                    this.mDataList.get(i).getMaxY(),
                    this.mDataList.get(i).getMinZ(),
                    this.mDataList.get(i).getMaxZ()
                );
                if (
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.Geometry.intersects(
                    objectBox,
                    ray
                )) {
                    object = i;
                    break;
                }
            }
        }
        if (this.mObjectPressed != object && object != -1) this.setObjectPressed(object);
        this.changeTouchedState();
        return object;
    }

    public changeTouchedState() : void {
        for (let i: number = 0; i < this.mDataList.size(); i++) {
            let d: 
                // TODO: Warning - type not found in scope.
            DataStorage = this.mDataList.get(i);
            if (i == this.mObjectPressed) {
                if (!
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.Geometry.isValidPosition(
                    d.getMaxX(),
                    d.getMinX(),
                    d.getMaxY(),
                    d.getMinY(),
                    this.mDataList,
                    i
                )) this.mDataList.get(i).setStateObject(ViewerRenderer.OUT_TOUCHED); else this.mDataList.get(i).setStateObject(ViewerRenderer.INSIDE_TOUCHED);
            } else {
                if (!
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.Geometry.isValidPosition(
                    d.getMaxX(),
                    d.getMinX(),
                    d.getMaxY(),
                    d.getMinY(),
                    this.mDataList,
                    i
                )) this.mDataList.get(i).setStateObject(ViewerRenderer.OUT_NOT_TOUCHED); else this.mDataList.get(i).setStateObject(ViewerRenderer.INSIDE_NOT_TOUCHED);
            }
        }
    }

    public dragObject(
            x: number,
            y: number) : void {
        let ray: Ray = ViewerRenderer.convertNormalized2DPointToRay(
            x,
            y
        );
        let touched: Point = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.Geometry.intersectionPointWitboxPlate(ray);
        let data: 
            // TODO: Warning - type not found in scope.
        DataStorage = this.mDataList.get(this.mObjectPressed);
        let dx: number = touched.x - data.getLastCenter().x;
        let dy: number = touched.y - data.getLastCenter().y;
        let maxX: number = data.getMaxX() + dx;
        let maxY: number = data.getMaxY() + dy;
        let minX: number = data.getMinX() + dx;
        let minY: number = data.getMinY() + dy;
        if (maxX > this.mPlate[0] + data.getLong() || minX < -this.mPlate[0] - data.getLong() || maxY > this.mPlate[1] + data.getWidth() || minY < -this.mPlate[1] - data.getWidth()) {
            return;
        } else {
            this.mDataList.get(this.mObjectPressed).setLastCenter(new Point(
                touched.x,
                touched.y,
                data.getLastCenter().z
            ));
            data.setMaxX(maxX);
            data.setMaxY(maxY);
            data.setMinX(minX);
            data.setMinY(minY);
            let finalx: number = 0;
            let finaly: number = 0;
            let i: number = 0;
            for (let element of this.mDataList) {
                finalx = element.getLastCenter().x;
                finaly = element.getLastCenter().y;
                i++;
            }
            finalx = finalx / i;
            finaly = finaly / i;
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.setSlicingPosition(
                finalx,
                finaly
            );
        }
    }

    public scaleObject(
            fx: number,
            fy: number,
            fz: number,
            error: boolean) : void {
        if (Math.abs(fx) < 10 && Math.abs(fy) < 10 && Math.abs(fz) < 10) {
            this.mScaleFactorX = fx;
            this.mScaleFactorY = fy;
            this.mScaleFactorZ = fz;
            let data: 
                // TODO: Warning - type not found in scope.
            DataStorage = this.mDataList.get(this.mObjectPressed);
            let lastCenter: Point = data.getLastCenter();
            let maxX: number = data.getMaxX() - lastCenter.x;
            let maxY: number = data.getMaxY() - lastCenter.y;
            let maxZ: number = data.getMaxZ();
            let minX: number = data.getMinX() - lastCenter.x;
            let minY: number = data.getMinY() - lastCenter.y;
            let minZ: number = data.getMinZ();
            let lastScaleFactorX: number = data.getLastScaleFactorX();
            let lastScaleFactorY: number = data.getLastScaleFactorY();
            let lastScaleFactorZ: number = data.getLastScaleFactorZ();
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
            } else {
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
    }

    public setRotationObject(angle: number) : void {
        let data: 
            // TODO: Warning - type not found in scope.
        DataStorage = this.mDataList.get(this.mObjectPressed);
        let rotateObjectMatrix: number[] = data.getRotationMatrix();
        let center: Point = data.getLastCenter();
        let mTemporaryMatrix: number[] = function(d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(16);
        let mFinalMatrix: number[] = function(d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(16);
        Matrix.setIdentityM(
            mTemporaryMatrix,
            0
        );
        Matrix.translateM(
            mTemporaryMatrix,
            0,
            0.0,
            0.0,
            0.0
        );
        Matrix.rotateM(
            mTemporaryMatrix,
            0,
            angle,
            this.mVector.x,
            this.mVector.y,
            this.mVector.z
        );
        Matrix.multiplyMM(
            mFinalMatrix,
            0,
            mTemporaryMatrix,
            0,
            rotateObjectMatrix,
            0
        );
        data.setRotationMatrix(mFinalMatrix);
    }

    public refreshRotatedObjectCoordinates() : void {
        const task: AsyncTask<Void,Void,Void> = new AsyncTask<Void,Void,Void>(){
        protected onPreExecute() : void {
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.configureProgressState(View.VISIBLE);
        }
        protected doInBackground(params: Void) : Void {
            try {
                let data: 
                    // TODO: Warning - type not found in scope.
                DataStorage = this.mDataList.get(this.mObjectPressed);
                data.initMaxMin();
                let coordinatesArray: number[] = data.getVertexArray();
                // TODO: Warning - declaring multiple variables with the same statement may not be supported.let x: number;
                let y: number;
                let z: number;
                let vector: number[] = function(d) {
                    // new float[4]
                    // TODO: Consider refactoring this array initialization to be more readable.
                    let r = [];
                    for (let i = 0; i < d; i++) r.push(0);
                    return r;
                }(4);
                let result: number[] = function(d) {
                    // new float[4]
                    // TODO: Consider refactoring this array initialization to be more readable.
                    let r = [];
                    for (let i = 0; i < d; i++) r.push(0);
                    return r;
                }(4);
                let aux: number[] = function(d) {
                    // new float[16]
                    // TODO: Consider refactoring this array initialization to be more readable.
                    let r = [];
                    for (let i = 0; i < d; i++) r.push(0);
                    return r;
                }(16);
                let rotationMatrix: number[] = data.getRotationMatrix();
                for (let i: number = 0; i < coordinatesArray.length; i = 3) {
                    vector[0] = coordinatesArray[i];
                    vector[1] = coordinatesArray[i + 1];
                    vector[2] = coordinatesArray[i + 2];
                    Matrix.setIdentityM(
                        aux,
                        0
                    );
                    Matrix.multiplyMM(
                        aux,
                        0,
                        rotationMatrix,
                        0,
                        aux,
                        0
                    );
                    Matrix.multiplyMV(
                        result,
                        0,
                        aux,
                        0,
                        vector,
                        0
                    );
                    x = result[0];
                    y = result[1];
                    z = result[2];
                    data.adjustMaxMin(
                        x,
                        y,
                        z
                    );
                }
                let maxX: number = data.getMaxX();
                let minX: number = data.getMinX();
                let minY: number = data.getMinY();
                let maxY: number = data.getMaxY();
                let maxZ: number = data.getMaxZ();
                let minZ: number = data.getMinZ();
                let lastCenter: Point = data.getLastCenter();
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
                let adjustZ: number = 0;
                if (minZ != 0) adjustZ = -data.getMinZ() + (number) 
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.DataStorage.MIN_Z;
                data.setAdjustZ(adjustZ);
                data.setMinZ(minZ + adjustZ);
                data.setMaxZ(maxZ + adjustZ);
            } catch (e) {
                if (e instanceof ArrayIndexOutOfBoundsException) {
                    
                        // TODO: Warning - no scope specified; assuming 'this'.
                        this.e.printStackTrace();
                }
            }
            return null;
        }
        protected onPostExecute(unused: Void) : void {
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.configureProgressState(View.GONE);
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.displayModelSize(this.mObjectPressed);
        }
        };
        task.execute();
    }

    private static convertNormalized2DPointToRay(
            normalizedX: number,
            normalizedY: number) : Ray {
        const nearPointNdc: number[] = [
            normalizedX,
            normalizedY,
            -1,
            1
        ];
        const farPointNdc: number[] = [
            normalizedX,
            normalizedY,
            1,
            1
        ];
        const nearPointWorld: number[] = function(d) {
            // new float[4]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(4);
        const farPointWorld: number[] = function(d) {
            // new float[4]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(4);
        Matrix.multiplyMV(
            nearPointWorld,
            0,
            ViewerRenderer.invertedMVPMatrix,
            0,
            nearPointNdc,
            0
        );
        Matrix.multiplyMV(
            farPointWorld,
            0,
            ViewerRenderer.invertedMVPMatrix,
            0,
            farPointNdc,
            0
        );
        ViewerRenderer.divideByW(nearPointWorld);
        ViewerRenderer.divideByW(farPointWorld);
        let nearPointRay: Point = new Point(
            nearPointWorld[0],
            nearPointWorld[1],
            nearPointWorld[2]
        );
        let farPointRay: Point = new Point(
            farPointWorld[0],
            farPointWorld[1],
            farPointWorld[2]
        );
        return new Ray(
            nearPointRay,
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.vectorBetween(
                nearPointRay,
                farPointRay
            )
        );
    }

    private static divideByW(vector: number[]) : void {
        vector[0] = vector[3];
        vector[1] = vector[3];
        vector[2] = vector[3];
    }

    public getWidthScreen() : number {
        return ViewerRenderer.mWidth;
    }

    public getHeightScreen() : number {
        return ViewerRenderer.mHeight;
    }

    private setColor(object: number) : void {
        let stl: 
            // TODO: Warning - type not found in scope.
        StlObject = this.mStlObjectList.get(object);
        switch (this.mDataList.get(object).getStateObject()) {
            case ViewerRenderer.INSIDE_NOT_TOUCHED:
                stl.setColor(
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.StlObject.colorNormal);
                break;
            case ViewerRenderer.INSIDE_TOUCHED:
                stl.setColor(
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.StlObject.colorSelectedObject);
                break;
            case ViewerRenderer.OUT_NOT_TOUCHED:
                stl.setColor(
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.StlObject.colorObjectOut);
                break;
            case ViewerRenderer.OUT_TOUCHED:
                stl.setColor(
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.StlObject.colorObjectOutTouched);
                break;
        }
    }

    public generatePlate(type: number[]) : void {
        try {
            this.mPlate = type;
            if (this.mMode == 
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.PRINT_PREVIEW) {
                this.mWitboxFaceBack = new 
                    // TODO: Warning - type not found in scope.
                WitboxFaces(
                    ViewerRenderer.BACK,
                    this.mPlate
                );
                this.mWitboxFaceRight = new 
                    // TODO: Warning - type not found in scope.
                WitboxFaces(
                    ViewerRenderer.RIGHT,
                    this.mPlate
                );
                this.mWitboxFaceLeft = new 
                    // TODO: Warning - type not found in scope.
                WitboxFaces(
                    ViewerRenderer.LEFT,
                    this.mPlate
                );
                this.mWitboxFaceFront = new 
                    // TODO: Warning - type not found in scope.
                WitboxFaces(
                    ViewerRenderer.FRONT,
                    this.mPlate
                );
                this.mWitboxFaceTop = new 
                    // TODO: Warning - type not found in scope.
                WitboxFaces(
                    ViewerRenderer.TOP,
                    this.mPlate
                );
                this.mWitboxFaceDown = new 
                    // TODO: Warning - type not found in scope.
                WitboxPlate(
                    this.mContext,
                    false,
                    this.mPlate
                );
            }
            this.mWitboxFaceBack.generatePlaneCoords(
                ViewerRenderer.BACK,
                type
            );
            this.mWitboxFaceRight.generatePlaneCoords(
                ViewerRenderer.RIGHT,
                type
            );
            this.mWitboxFaceLeft.generatePlaneCoords(
                ViewerRenderer.LEFT,
                type
            );
            this.mWitboxFaceFront.generatePlaneCoords(
                ViewerRenderer.FRONT,
                type
            );
            this.mWitboxFaceTop.generatePlaneCoords(
                ViewerRenderer.TOP,
                type
            );
            this.mWitboxFaceDown.generatePlaneCoords(
                type,
                false
            );
        } catch (e) {
            if (e instanceof NullPointerException) {
                
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.e.printStackTrace();
            }
        }
    }

    public onSurfaceCreated(
            unused: GL10,
            config: EGLConfig) : void {
        GLES20.glClearColor(
            0.149,
            0.196,
            0.22,
            1.0
        );
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
        Matrix.setIdentityM(
            this.mModelMatrix,
            0
        );
        ViewerRenderer.mCurrentSceneAngleX = 0;
        ViewerRenderer.mCurrentSceneAngleY = 0;
        ViewerRenderer.mSceneAngleX = ViewerRenderer.ANGLE_X;
        ViewerRenderer.mSceneAngleY = ViewerRenderer.ANGLE_Y;
        if (this.mDataList.size() > 0) if (this.isStl()) {
            this.mStlObjectList.clear();
            for (let i: number = 0; i < this.mDataList.size(); i++) {
                if (this.mDataList.get(i).getVertexArray() != null) {
                    Log.i(
                        "VERTEX",
                        "adding"
                    );
                    this.mStlObjectList.add(new 
                        // TODO: Warning - type not found in scope.
                    StlObject(
                        this.mDataList.get(i),
                        this.mContext,
                        this.mState
                    ));
                } else Log.i(
                    "VERTEX",
                    "ONE NULL " + i
                );
            }
        } else if (this.mDataList.size() > 0) {
            try {
                this.mGcodeObject = new 
                    // TODO: Warning - type not found in scope.
                GcodeObject(
                    this.mDataList.get(0),
                    this.mContext
                );
            } catch (e) {
                if (e instanceof NullPointerException) {
                    
                        // TODO: Warning - no scope specified; assuming 'this'.
                        this.e.printStackTrace();
                }
            }
        }
        if (this.mMode == 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT || this.mMode == 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.PRINT_PREVIEW) this.mInfinitePlane = new 
            // TODO: Warning - type not found in scope.
        WitboxPlate(
            this.mContext,
            true,
            
                // TODO: Warning - no scope specified; assuming 'this'.
                this.ViewerMainFragment.getCurrentPlate()
        );
        this.mWitboxFaceBack = new 
            // TODO: Warning - type not found in scope.
        WitboxFaces(
            ViewerRenderer.BACK,
            this.mPlate
        );
        this.mWitboxFaceRight = new 
            // TODO: Warning - type not found in scope.
        WitboxFaces(
            ViewerRenderer.RIGHT,
            this.mPlate
        );
        this.mWitboxFaceLeft = new 
            // TODO: Warning - type not found in scope.
        WitboxFaces(
            ViewerRenderer.LEFT,
            this.mPlate
        );
        this.mWitboxFaceFront = new 
            // TODO: Warning - type not found in scope.
        WitboxFaces(
            ViewerRenderer.FRONT,
            this.mPlate
        );
        this.mWitboxFaceTop = new 
            // TODO: Warning - type not found in scope.
        WitboxFaces(
            ViewerRenderer.TOP,
            this.mPlate
        );
        this.mWitboxFaceDown = new 
            // TODO: Warning - type not found in scope.
        WitboxPlate(
            this.mContext,
            false,
            this.mPlate
        );
        this.mCircle = new 
            // TODO: Warning - type not found in scope.
        Circles();
    }

    public onSurfaceChanged(
            unused: GL10,
            width: number,
            height: number) : void {
        ViewerRenderer.mWidth = width;
        ViewerRenderer.mHeight = height;
        Log.i(
            "OUT",
            "Width: " + width + " ; Height: " + height
        );
        GLES20.glViewport(
            0,
            0,
            width,
            height
        );
        let ratio: number = (number) width / height;
        Matrix.perspectiveM(
            this.mProjectionMatrix,
            0,
            45,
            ratio,
            ViewerRenderer.Z_NEAR,
            ViewerRenderer.Z_FAR
        );
        if (this.mMode == 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT || this.mMode == 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.PRINT_PREVIEW) {
            let data: 
                // TODO: Warning - type not found in scope.
            DataStorage = this.mDataList.get(0);
            let h: number = data.getHeight();
            let l: number = data.getLong();
            let w: number = data.getWidth();
            l = l / ratio;
            w = w / ratio;
            let dh: number = (number) (h / (Math.tan(Math.toRadians(45 / 2))));
            let dl: number = (number) (l / (2 * Math.tan(Math.toRadians(45 / 2))));
            let dw: number = (number) (w / (2 * Math.tan(Math.toRadians(45 / 2))));
            if (dw > dh && dw > dl) ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_BIG_HEIGHT * h; else if (dh > dl) ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_HEIGHT * h; else ViewerRenderer.mCameraZ = ViewerRenderer.OFFSET_BIG_HEIGHT * h;
            dl = dl + Math.abs(data.getMinY());
            dw = dw + Math.abs(data.getMinX());
            if (dw > dh && dw > dl) ViewerRenderer.mCameraY = -dw; else if (dh > dl) ViewerRenderer.mCameraY = -dh; else ViewerRenderer.mCameraY = -dl;
            this.mDx = -data.getLastCenter().x;
            this.mDy = -data.getLastCenter().y;
            ViewerRenderer.mSceneAngleX = -40;
            ViewerRenderer.mSceneAngleY = 0;
        } else {
            ViewerRenderer.mCameraY = ViewerRenderer.CAMERA_DEFAULT_Y;
            ViewerRenderer.mCameraZ = ViewerRenderer.CAMERA_DEFAULT_Z;
        }
    }

    matrixTranslate(
            x: number,
            y: number,
            z: number) : void {
        this.mDx = x;
        this.mDy = y;
        if ((this.mDx < -300) || (this.mDx > 300)) this.mDx = x;
        if ((this.mDy < -250) || (this.mDy > 250)) this.mDy = y;
        this.mViewMatrix[14] = z;
    }

    public onDrawFrame(unused: GL10) : void {
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
        if (this.isStl()) for (let i: number = 0; i < this.mStlObjectList.size(); i++) this.setColor(i);
        GLES20.glEnable(GLES20.GL_BLEND);
        GLES20.glEnable(GLES20.GL_DEPTH_TEST);
        Matrix.setLookAtM(
            this.mViewMatrix,
            0,
            ViewerRenderer.mCameraX,
            ViewerRenderer.mCameraY,
            ViewerRenderer.mCameraZ,
            ViewerRenderer.mCenterX,
            ViewerRenderer.mCenterY,
            ViewerRenderer.mCenterZ,
            0,
            0.0,
            1.0
        );
        this.mViewMatrix[12] = this.mDx;
        this.mViewMatrix[13] = this.mDy;
        Matrix.multiplyMM(
            this.mVPMatrix,
            0,
            this.mProjectionMatrix,
            0,
            this.mViewMatrix,
            0
        );
        Matrix.setIdentityM(
            this.mRotationMatrix,
            0
        );
        Matrix.translateM(
            this.mRotationMatrix,
            0,
            0.0,
            0.0,
            0.0
        );
        Matrix.rotateM(
            this.mRotationMatrix,
            0,
            ViewerRenderer.mSceneAngleX,
            0.0,
            0.0,
            1.0
        );
        ViewerRenderer.mCurrentSceneAngleX = ViewerRenderer.mSceneAngleX;
        ViewerRenderer.mSceneAngleX = 0;
        Matrix.multiplyMM(
            this.mTemporaryMatrix,
            0,
            this.mModelMatrix,
            0,
            this.mRotationMatrix,
            0
        );
        System.arraycopy(
            this.mTemporaryMatrix,
            0,
            this.mModelMatrix,
            0,
            16
        );
        Matrix.setIdentityM(
            this.mRotationMatrix,
            0
        );
        Matrix.translateM(
            this.mRotationMatrix,
            0,
            0.0,
            0.0,
            0.0
        );
        Matrix.rotateM(
            this.mRotationMatrix,
            0,
            ViewerRenderer.mSceneAngleY,
            1.0,
            0.0,
            0.0
        );
        ViewerRenderer.mCurrentSceneAngleY = ViewerRenderer.mSceneAngleY;
        ViewerRenderer.mSceneAngleY = 0;
        if (ViewerRenderer.mCurrentSceneAngleX > 180) ViewerRenderer.mCurrentSceneAngleX = 360; else if (ViewerRenderer.mCurrentSceneAngleX < -180) ViewerRenderer.mCurrentSceneAngleX = 360;
        if (ViewerRenderer.mCurrentSceneAngleY > 180) ViewerRenderer.mCurrentSceneAngleY = 360; else if (ViewerRenderer.mCurrentSceneAngleY < -180) ViewerRenderer.mCurrentSceneAngleY = 360;
        Matrix.multiplyMM(
            this.mTemporaryMatrix,
            0,
            this.mRotationMatrix,
            0,
            this.mModelMatrix,
            0
        );
        System.arraycopy(
            this.mTemporaryMatrix,
            0,
            this.mModelMatrix,
            0,
            16
        );
        Matrix.multiplyMM(
            this.mMVPMatrix,
            0,
            this.mVPMatrix,
            0,
            this.mModelMatrix,
            0
        );
        Matrix.multiplyMM(
            this.mMVMatrix,
            0,
            this.mViewMatrix,
            0,
            this.mModelMatrix,
            0
        );
        Matrix.invertM(
            ViewerRenderer.invertedMVPMatrix,
            0,
            this.mMVPMatrix,
            0
        );
        Matrix.setIdentityM(
            this.mLightModelMatrix,
            0
        );
        Matrix.translateM(
            this.mLightModelMatrix,
            0,
            ViewerRenderer.LIGHT_X,
            ViewerRenderer.LIGHT_Y,
            ViewerRenderer.LIGHT_Z
        );
        Matrix.multiplyMV(
            this.mLightPosInWorldSpace,
            0,
            this.mLightModelMatrix,
            0,
            this.mLightPosInModelSpace,
            0
        );
        Matrix.multiplyMV(
            this.mLightPosInEyeSpace,
            0,
            this.mViewMatrix,
            0,
            this.mLightPosInWorldSpace,
            0
        );
        if (this.mDataList.size() > 0) {
            if (this.mObjectPressed != -1) {
                if (this.mObjectPressed < this.mDataList.size()) {
                    let data: 
                        // TODO: Warning - type not found in scope.
                    DataStorage = this.mDataList.get(this.mObjectPressed);
                    let center: Point = data.getLastCenter();
                    Log.i(
                        "CENTER",
                        "Settings center @" + center.x + ";" + center.y + ";" + center.z
                    );
                    Matrix.setIdentityM(
                        this.mTemporaryModel,
                        0
                    );
                    Matrix.translateM(
                        this.mTemporaryModel,
                        0,
                        center.x,
                        center.y,
                        center.z
                    );
                    Matrix.scaleM(
                        this.mTemporaryModel,
                        0,
                        data.getLastScaleFactorX(),
                        data.getLastScaleFactorY(),
                        data.getLastScaleFactorZ()
                    );
                    Matrix.translateM(
                        this.mTemporaryModel,
                        0,
                        0,
                        0,
                        data.getAdjustZ()
                    );
                    let rotateObjectMatrix: number[] = data.getRotationMatrix();
                    Matrix.multiplyMM(
                        this.mObjectModel,
                        0,
                        this.mTemporaryModel,
                        0,
                        rotateObjectMatrix,
                        0
                    );
                    Matrix.multiplyMM(
                        this.mMVPObjectMatrix,
                        0,
                        this.mMVPMatrix,
                        0,
                        this.mObjectModel,
                        0
                    );
                    Matrix.multiplyMM(
                        this.mMVObjectMatrix,
                        0,
                        this.mMVMatrix,
                        0,
                        this.mObjectModel,
                        0
                    );
                    Matrix.transposeM(
                        this.mTransInvMVMatrix,
                        0,
                        this.mMVObjectMatrix,
                        0
                    );
                    Matrix.invertM(
                        this.mTransInvMVMatrix,
                        0,
                        this.mTransInvMVMatrix,
                        0
                    );
                } else {
                    Log.i(
                        "Multiply",
                        "IndexOutOfBounds " + this.mObjectPressed
                    );
                }
            }
            if (this.isStl()) for (let i: number = 0; i < this.mStlObjectList.size(); i++) {
                if (i == this.mObjectPressed) {
                    try {
                        if (this.mDataList.size() > 0) {
                            this.mDataList.get(this.mObjectPressed).setModelMatrix(this.mObjectModel);
                            this.mStlObjectList.get(this.mObjectPressed).draw(
                                this.mMVPObjectMatrix,
                                this.mTransInvMVMatrix,
                                this.mLightPosInEyeSpace,
                                this.mObjectModel
                            );
                            this.mCircle.draw(
                                this.mDataList.get(this.mObjectPressed),
                                this.mMVPMatrix,
                                this.mAxis
                            );
                        }
                    } catch (e) {
                        if (e instanceof IndexOutOfBoundsException) {
                            Log.i(
                                "Slicer",
                                "IndexOutOfBounds " + this.mObjectPressed
                            );
                        }
                    }
                } else {
                    let modelMatrix: number[] = this.mDataList.get(i).getModelMatrix();
                    let mvpMatrix: number[] = function(d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        let r = [];
                        for (let i = 0; i < d; i++) r.push(0);
                        return r;
                    }(16);
                    let mvMatrix: number[] = function(d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        let r = [];
                        for (let i = 0; i < d; i++) r.push(0);
                        return r;
                    }(16);
                    let mvFinalMatrix: number[] = function(d) {
                        // new float[16]
                        // TODO: Consider refactoring this array initialization to be more readable.
                        let r = [];
                        for (let i = 0; i < d; i++) r.push(0);
                        return r;
                    }(16);
                    Matrix.multiplyMM(
                        mvpMatrix,
                        0,
                        this.mMVPMatrix,
                        0,
                        modelMatrix,
                        0
                    );
                    Matrix.multiplyMM(
                        mvMatrix,
                        0,
                        this.mMVMatrix,
                        0,
                        modelMatrix,
                        0
                    );
                    Matrix.transposeM(
                        mvFinalMatrix,
                        0,
                        mvMatrix,
                        0
                    );
                    Matrix.invertM(
                        mvFinalMatrix,
                        0,
                        mvFinalMatrix,
                        0
                    );
                    this.mStlObjectList.get(i).draw(
                        mvpMatrix,
                        mvFinalMatrix,
                        this.mLightPosInEyeSpace,
                        modelMatrix
                    );
                }
            } else {
                try {
                    if (this.mGcodeObject != null) this.mGcodeObject.draw(this.mMVPMatrix);
                } catch (e) {
                    if (e instanceof NullPointerException) {
                        
                            // TODO: Warning - no scope specified; assuming 'this'.
                            this.e.printStackTrace();
                    }
                }
            }
        }
        if (this.mMode == 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.DO_SNAPSHOT) {
            this.mInfinitePlane.draw(
                this.mMVPMatrix,
                this.mMVMatrix
            );
            this.takeSnapshot(unused);
        } else {
            if (this.mShowDownWitboxFace) this.mWitboxFaceDown.draw(
                this.mMVPMatrix,
                this.mMVMatrix
            );
            if (this.mShowBackWitboxFace) this.mWitboxFaceBack.draw(this.mMVPMatrix);
            if (this.mShowRightWitboxFace) this.mWitboxFaceRight.draw(this.mMVPMatrix);
            if (this.mShowLeftWitboxFace) this.mWitboxFaceLeft.draw(this.mMVPMatrix);
            if (this.mShowFrontWitboxFace) this.mWitboxFaceFront.draw(this.mMVPMatrix);
            if (this.mShowTopWitboxFace) this.mWitboxFaceTop.draw(this.mMVPMatrix);
        }
    }

    private takeSnapshot(unused: GL10) : void {
        Log.i(
            ViewerRenderer.TAG,
            "TAKING SNAPSHOT"
        );
        let minX: number = 0;
        let minY: number = 0;
        let screenshotSize: number = ViewerRenderer.mWidth * ViewerRenderer.mHeight;
        let bb: ByteBuffer = ByteBuffer.allocateDirect(screenshotSize * 4);
        bb.order(ByteOrder.nativeOrder());
        GLES20.glReadPixels(
            minX,
            minY,
            ViewerRenderer.mWidth,
            ViewerRenderer.mHeight,
            GLES20.GL_RGBA,
            GLES20.GL_UNSIGNED_BYTE,
            bb
        );
        LibraryModelCreation.saveSnapshot(
            ViewerRenderer.mWidth,
            ViewerRenderer.mHeight,
            bb
        );
    }

    public setSceneAngleX(x: number) : void {
        ViewerRenderer.mSceneAngleX = x;
    }

    public setSceneAngleY(y: number) : void {
        ViewerRenderer.mSceneAngleY = y;
    }

    public setCameraPosX(x: number) : void {
        ViewerRenderer.mCameraX = x;
    }

    public setCameraPosY(y: number) : void {
        ViewerRenderer.mCameraY = y;
    }

    public setCameraPosZ(z: number) : void {
        ViewerRenderer.mCameraZ = z;
    }

    public getCameraPosX() : number {
        return ViewerRenderer.mCameraX;
    }

    public getCameraPosY() : number {
        return ViewerRenderer.mCameraY;
    }

    public getCameraPosZ() : number {
        return ViewerRenderer.mCameraZ;
    }

    public setCenterX(x: number) : void {
        ViewerRenderer.mCenterX = x;
    }

    public setCenterY(y: number) : void {
        ViewerRenderer.mCenterY = y;
    }

    public setCenterZ(z: number) : void {
        ViewerRenderer.mCenterZ = z;
    }

    public setZNear(h: number) : void {
        let ang: number = Math.toRadians(45 / 2);
        let valor: number = (number) Math.tan(ang);
        ViewerRenderer.Z_NEAR = valor * (h / 2);
    }

    public static loadShader(
            type: number,
            shaderCode: string) : number {
        let shader: number = GLES20.glCreateShader(type);
        GLES20.glShaderSource(
            shader,
            shaderCode
        );
        GLES20.glCompileShader(shader);
        return shader;
    }

    public static checkGlError(glOperation: string) : void {
        let error: number;
        while ((error = GLES20.glGetError()) != GLES20.GL_NO_ERROR) {
            Log.e(
                ViewerRenderer.TAG,
                glOperation + ": glError " + error
            );
            throw new RuntimeException(glOperation + ": glError " + error);
        }
    }

    private static readonly CAMERA_MIN_TRANSLATION_DISTANCE: number = 0.1;

    private static readonly CAMERA_MAX_ROTATION_DISTANCE: number = 5;

    private static readonly CAMERA_MIN_ROTATION_DISTANCE: number = 1;

    private static readonly POSITION_MIN_TRANSLATION_DISTANCE: number = 0.05;

    public restoreInitialCameraPosition(
            dx: number,
            dy: number,
            zoom: boolean,
            rotation: boolean) : boolean {
        let dyx: number = 0;
        if (!zoom) dyx = ViewerRenderer.POSITION_DEFAULT_Y;
        if ((number) this.mDx < (number) (ViewerRenderer.POSITION_DEFAULT_X - dx)) this.mDx = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE; else if ((number) this.mDx > (number) (ViewerRenderer.POSITION_DEFAULT_X - dx)) this.mDx = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
        if ((number) this.mDy < (number) (dyx - dy)) this.mDy = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE; else if ((number) this.mDy > (number) (dyx - dy)) this.mDy = ViewerRenderer.POSITION_MIN_TRANSLATION_DISTANCE;
        if (!zoom) {
            if ((number) ViewerRenderer.mCameraX < ViewerRenderer.CAMERA_DEFAULT_X) ViewerRenderer.mCameraX = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE; else if ((number) ViewerRenderer.mCameraX > ViewerRenderer.CAMERA_DEFAULT_X) ViewerRenderer.mCameraX = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
            if ((number) ViewerRenderer.mCameraY < ViewerRenderer.CAMERA_DEFAULT_Y) ViewerRenderer.mCameraY = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE; else if ((number) ViewerRenderer.mCameraY > ViewerRenderer.CAMERA_DEFAULT_Y) ViewerRenderer.mCameraY = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
            if ((number) ViewerRenderer.mCameraZ < ViewerRenderer.CAMERA_DEFAULT_Z) ViewerRenderer.mCameraZ = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE; else if ((number) ViewerRenderer.mCameraZ > ViewerRenderer.CAMERA_DEFAULT_Z) ViewerRenderer.mCameraZ = ViewerRenderer.CAMERA_MIN_TRANSLATION_DISTANCE;
        }
        if (rotation) {
            if ((number) ViewerRenderer.mCurrentSceneAngleX < ViewerRenderer.ANGLE_X) {
                if ((number) ViewerRenderer.mCurrentSceneAngleX > (ViewerRenderer.ANGLE_X - 10)) ViewerRenderer.mSceneAngleX = ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE; else ViewerRenderer.mSceneAngleX = ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
            } else if ((number) ViewerRenderer.mCurrentSceneAngleX > ViewerRenderer.ANGLE_X) {
                if ((number) ViewerRenderer.mCurrentSceneAngleX < (ViewerRenderer.ANGLE_X + 10)) ViewerRenderer.mSceneAngleX = -ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE; else ViewerRenderer.mSceneAngleX = -ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
            }
            if ((number) ViewerRenderer.mCurrentSceneAngleY < ViewerRenderer.ANGLE_Y) {
                if ((number) ViewerRenderer.mCurrentSceneAngleY > (ViewerRenderer.ANGLE_Y - 10)) ViewerRenderer.mSceneAngleY = ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE; else ViewerRenderer.mSceneAngleY = ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
            } else if ((number) ViewerRenderer.mCurrentSceneAngleY > ViewerRenderer.ANGLE_Y) {
                if ((number) ViewerRenderer.mCurrentSceneAngleY < (ViewerRenderer.ANGLE_Y + 10)) ViewerRenderer.mSceneAngleY = -ViewerRenderer.CAMERA_MIN_ROTATION_DISTANCE; else ViewerRenderer.mSceneAngleY = -ViewerRenderer.CAMERA_MAX_ROTATION_DISTANCE;
            }
        }
        if (((((number) ViewerRenderer.mCameraZ == ViewerRenderer.CAMERA_DEFAULT_Z) && ((number) ViewerRenderer.mCameraY == ViewerRenderer.CAMERA_DEFAULT_Y) && ((number) ViewerRenderer.mCameraX == ViewerRenderer.CAMERA_DEFAULT_X)) || (zoom)) && (((number) ViewerRenderer.mCurrentSceneAngleX == ViewerRenderer.ANGLE_X) && ((number) ViewerRenderer.mCurrentSceneAngleY == ViewerRenderer.ANGLE_Y) || (!rotation)) && ((number) this.mDx == (number) (ViewerRenderer.POSITION_DEFAULT_X - dx)) && ((number) this.mDy == (number) (dyx - dy))) return true; else {
            return false;
        }
    }
}
