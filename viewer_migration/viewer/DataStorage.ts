// package android.app.printerapp.viewer;

import { Log } from "./android/app/printerapp/Log";
import { Point } from "./android/app/printerapp/viewer/Geometry/Point";
import { Matrix } from "./android/opengl/Matrix";
import { ArrayList } from "./java/util/ArrayList";
import { List } from "./java/util/List";

export class DataStorage {
    private mVertexList: List<Float> = new ArrayList<Float>();

    private mNormalList: List<Float> = new ArrayList<Float>();

    private mLineLengthList: List<Integer> = new ArrayList<Integer>();

    private mLayerList: List<Integer> = new ArrayList<Integer>();

    private mTypeList: List<Integer> = new ArrayList<Integer>();

    private mVertexArray: number[];

    private mNormalArray: number[];

    private mLayerArray: number[];

    private mTypeArray: number[];

    private mMaxLayer: number;

    private mActualLayer: number;

    private mMaxLines: number;

    private mMinX: number;

    private mMaxX: number;

    private mMinY: number;

    private mMaxY: number;

    private mMinZ: number;

    private mMaxZ: number;

    private mPath: string;

    private mPathSnapshot: string;

    public static readonly MOVE: number = 0;

    public static readonly FILL: number = 1;

    public static readonly PERIMETER: number = 2;

    public static readonly RETRACT: number = 3;

    public static readonly COMPENSATE: number = 4;

    public static readonly BRIDGE: number = 5;

    public static readonly SKIRT: number = 6;

    public static readonly WALL_INNER: number = 7;

    public static readonly WALL_OUTER: number = 8;

    public static readonly SUPPORT: number = 9;

    public static readonly TRIANGLE_VERTEX: number = 3;

    private mRotationMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private mModelMatrix: number[] = function(d) {
        // new float[16]
        // TODO: Consider refactoring this array initialization to be more readable.
        let r = [];
        for (let i = 0; i < d; i++) r.push(0);
        return r;
    }(16);

    private mLastScaleFactorX: number = 1.0;

    private mLastScaleFactorY: number = 1.0;

    private mLastScaleFactorZ: number = 1.0;

    private mLastCenter: Point = new Point(
        0,
        0,
        0
    );

    private mStateObject: number;

    private mAdjustZ: number;

    public static readonly MIN_Z: number = 0.1;

    public constructor() {
        Matrix.setIdentityM(
            this.mRotationMatrix,
            0
        );
        Matrix.setIdentityM(
            this.mModelMatrix,
            0
        );
    }

    public copyData(d: 
        // TODO: Warning - type not found in scope.
    DataStorage) : void {
        for (let i: number = 0; i < d.getLineLengthList().size(); i++) this.mLineLengthList.add(d.getLineLengthList().get(i));
        this.mVertexArray = function(d) {
            // new float[d.getVertexArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(d.getVertexArray().length);
        for (let i: number = 0; i < d.getVertexArray().length; i++) {
            this.mVertexArray[i] = d.getVertexArray()[i];
        }
        this.mNormalArray = function(d) {
            // new float[d.getNormalArray().length]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(d.getNormalArray().length);
        for (let i: number = 0; i < d.getNormalArray().length; i++) {
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
        this.mLastCenter = new Point(
            d.getLastCenter().x,
            d.getLastCenter().y,
            d.getLastCenter().z
        );
        for (let i: number = 0; i < this.mRotationMatrix.length; i++) this.mRotationMatrix[i] = d.getRotationMatrix()[i];
        for (let i: number = 0; i < this.mModelMatrix.length; i++) this.mModelMatrix[i] = d.getModelMatrix()[i];
    }

    public setMaxLinesFile(maxLines: number) : void {
        this.mMaxLines = maxLines;
    }

    public getMaxLinesFile() : number {
        return this.mMaxLines;
    }

    public getCoordinateListSize() : number {
        return this.mVertexList.size();
    }

    public addVertex(v: number) : void {
        this.mVertexList.add(v);
    }

    public addLayer(layer: number) : void {
        this.mLayerList.add(layer);
    }

    public addType(type: number) : void {
        this.mTypeList.add(type);
    }

    public addNormal(normal: number) : void {
        this.mNormalList.add(normal);
    }

    public addLineLength(length: number) : void {
        this.mLineLengthList.add(length);
    }

    public fillVertexArray(center: boolean) : void {
        this.mVertexArray = function(d) {
            // new float[mVertexList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(this.mVertexList.size());
        this.centerSTL(center);
    }

    public initMaxMin() : void {
        this.setMaxX(-Float.MAX_VALUE);
        this.setMaxY(-Float.MAX_VALUE);
        this.setMaxZ(-Float.MAX_VALUE);
        this.setMinX(Float.MAX_VALUE);
        this.setMinY(Float.MAX_VALUE);
        this.setMinZ(Float.MAX_VALUE);
    }

    public centerSTL(center: boolean) : void {
        let distX: number = 0;
        let distY: number = 0;
        let distZ: number = this.mMinZ;
        if (center) {
            distX = this.mMinX + (this.mMaxX - this.mMinX) / 2;
            distY = this.mMinY + (this.mMaxY - this.mMinY) / 2;
            distZ = this.mMinZ - (number) DataStorage.MIN_Z;
        }
        Log.i(
            "PrintView",
            distZ + ""
        );
        for (let i: number = 0; i < this.mVertexList.size(); i = i + 3) {
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
    }

    public fillNormalArray() : void {
        this.mNormalArray = function(d) {
            // new float[mNormalList.size() * TRIANGLE_VERTEX]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(this.mNormalList.size() * DataStorage.TRIANGLE_VERTEX);
        let index: number = 0;
        let x: number;
        let y: number;
        let z: number;
        for (let i: number = 0; i < this.mNormalList.size(); i = 3) {
            x = this.mNormalList.get(i);
            y = this.mNormalList.get(i + 1);
            z = this.mNormalList.get(i + 2);
            for (let j: number = 0; j < DataStorage.TRIANGLE_VERTEX; j++) {
                this.mNormalArray[index] = x;
                this.mNormalArray[index + 1] = y;
                this.mNormalArray[index + 2] = z;
                index = 3;
            }
        }
    }

    public fillLayerArray() : void {
        this.mLayerArray = function(d) {
            // new int[mLayerList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(this.mLayerList.size());
        for (let i: number = 0; i < this.mLayerList.size(); i++) {
            this.mLayerArray[i] = this.mLayerList.get(i);
        }
    }

    public fillTypeArray() : void {
        this.mTypeArray = function(d) {
            // new int[mTypeList.size()]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(this.mTypeList.size());
        for (let i: number = 0; i < this.mTypeList.size(); i++) {
            this.mTypeArray[i] = this.mTypeList.get(i);
        }
    }

    public getVertexArray() : number[] {
        return this.mVertexArray;
    }

    public getNormalArray() : number[] {
        return this.mNormalArray;
    }

    public getTypeArray() : number[] {
        return this.mTypeArray;
    }

    public getLayerArray() : number[] {
        return this.mLayerArray;
    }

    public clearVertexList() : void {
        this.mVertexList.clear();
    }

    public clearNormalList() : void {
        this.mNormalList.clear();
    }

    public clearLayerList() : void {
        this.mLayerList.clear();
    }

    public clearTypeList() : void {
        this.mTypeList.clear();
    }

    public getLineLengthList() : List<Integer> {
        return this.mLineLengthList;
    }

    public changeTypeAtIndex(
            index: number,
            type: number) : void {
        this.mTypeList.set(
            index,
            type
        );
    }

    public getTypeListSize() : number {
        return this.mTypeList.size();
    }

    public setActualLayer(layer: number) : void {
        this.mActualLayer = layer;
    }

    public getActualLayer() : number {
        return this.mActualLayer;
    }

    public setMaxLayer(maxLayer: number) : void {
        this.mMaxLayer = maxLayer;
        this.mActualLayer = maxLayer;
    }

    public getMaxLayer() : number {
        return this.mMaxLayer;
    }

    public getHeight() : number {
        return this.mMaxZ - this.mMinZ;
    }

    public getWidth() : number {
        return this.mMaxY - this.mMinY;
    }

    public getLong() : number {
        return this.mMaxX - this.mMinX;
    }

    public adjustMaxMin(
            x: number,
            y: number,
            z: number) : void {
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

    public setMinX(x: number) : void {
        this.mMinX = x;
    }

    public getMinX() : number {
        return this.mMinX;
    }

    public setMinY(y: number) : void {
        this.mMinY = y;
    }

    public getMinY() : number {
        return this.mMinY;
    }

    public setMinZ(z: number) : void {
        this.mMinZ = z;
    }

    public getMinZ() : number {
        return this.mMinZ;
    }

    public setMaxX(x: number) : void {
        this.mMaxX = x;
    }

    public getMaxX() : number {
        return this.mMaxX;
    }

    public setMaxY(y: number) : void {
        this.mMaxY = y;
    }

    public getMaxY() : number {
        return this.mMaxY;
    }

    public setMaxZ(z: number) : void {
        this.mMaxZ = z;
    }

    public getMaxZ() : number {
        return this.mMaxZ;
    }

    public setPathFile(path: string) : void {
        this.mPath = path;
    }

    public getPathFile() : string {
        return this.mPath;
    }

    public setPathSnapshot(path: string) : void {
        this.mPathSnapshot = path;
    }

    public getPathSnapshot() : string {
        return this.mPathSnapshot;
    }

    public setLastCenter(p: Point) : void {
        this.mLastCenter = p;
    }

    public getTrueCenter() : Point {
        let x: number = (this.mMaxX + this.mMinX) / 2;
        let y: number = (this.mMaxY + this.mMinY) / 2;
        let z: number = (this.mMaxZ + this.mMinZ) / 2;
        return new Point(
            x,
            y,
            z
        );
    }

    public getLastCenter() : Point {
        return this.mLastCenter;
    }

    public setRotationMatrix(m: number[]) : void {
        for (let i: number = 0; i < this.mRotationMatrix.length; i++) {
            this.mRotationMatrix[i] = m[i];
        }
    }

    public getRotationMatrix() : number[] {
        return this.mRotationMatrix;
    }

    public setModelMatrix(m: number[]) : void {
        for (let i: number = 0; i < this.mModelMatrix.length; i++) {
            this.mModelMatrix[i] = m[i];
        }
    }

    public getModelMatrix() : number[] {
        return this.mModelMatrix;
    }

    public setLastScaleFactorX(f: number) : void {
        this.mLastScaleFactorX = f;
    }

    public setLastScaleFactorY(f: number) : void {
        this.mLastScaleFactorY = f;
    }

    public setLastScaleFactorZ(f: number) : void {
        this.mLastScaleFactorZ = f;
    }

    public getLastScaleFactorX() : number {
        return this.mLastScaleFactorX;
    }

    public getLastScaleFactorY() : number {
        return this.mLastScaleFactorY;
    }

    public getLastScaleFactorZ() : number {
        return this.mLastScaleFactorZ;
    }

    public setStateObject(state: number) : void {
        this.mStateObject = state;
    }

    public getStateObject() : number {
        return this.mStateObject;
    }

    public setAdjustZ(z: number) : void {
        this.mAdjustZ = z;
    }

    public getAdjustZ() : number {
        return this.mAdjustZ;
    }
}
