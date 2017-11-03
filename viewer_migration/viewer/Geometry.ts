// package android.app.printerapp.viewer;

import { Matrix } from "./android/opengl/Matrix";
import { List } from "./java/util/List";

export class Geometry {
    private static readonly OFFSET: number = 20;

    // TODO: Warning - using nested classes may cause compilation problems.
    public static Point = class {
        public readonly x: number;
        public readonly y: number;
        public readonly z: number;
    
        public constructor(
                x: number,
                y: number,
                z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    };

    // TODO: Warning - using nested classes may cause compilation problems.
    public static Box = class {
        static readonly LEFT: number = 0;
    
        static readonly RIGHT: number = 1;
    
        static readonly FRONT: number = 2;
    
        static readonly BEHIND: number = 3;
    
        static readonly DOWN: number = 4;
    
        static readonly UP: number = 5;
    
        coordBox: number[] = function(d) {
            // new float[6]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(6);
    
        public constructor(
                minX: number,
                maxX: number,
                minY: number,
                maxY: number,
                minZ: number,
                maxZ: number) {
            this.coordBox[Geometry.Box.LEFT] = minX;
            this.coordBox[Geometry.Box.RIGHT] = maxX;
            this.coordBox[Geometry.Box.FRONT] = minY;
            this.coordBox[Geometry.Box.BEHIND] = maxY;
            this.coordBox[Geometry.Box.DOWN] = minZ;
            this.coordBox[Geometry.Box.UP] = maxZ;
        }
    };

    // TODO: Warning - using nested classes may cause compilation problems.
    public static Vector = class {
        public readonly x: number;
        public readonly y: number;
        public readonly z: number;
    
        public constructor(
                x: number,
                y: number,
                z: number) {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    
        public static substract(
                v1: Geometry.Vector,
                v2: Geometry.Vector) : Geometry.Vector {
            let x: number = v1.x - v2.x;
            let y: number = v1.y - v2.y;
            let z: number = v1.z - v2.z;
            let substract: Geometry.Vector = new Geometry.Vector(
                x,
                y,
                z
            );
            return substract;
        }
    
        public static crossProduct(
                v: Geometry.Vector,
                v2: Geometry.Vector) : Geometry.Vector {
            let x: number = (v.y * v2.z) - (v.z * v2.y);
            let y: number = (v.z * v2.x) - (v.x * v2.z);
            let z: number = (v.x * v2.y) - (v.y * v2.x);
            let result: Geometry.Vector = new Geometry.Vector(
                x,
                y,
                z
            );
            return result;
        }
    
        public static normalize(v: Geometry.Vector) : Geometry.Vector {
            let length: number = (number) Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
            let result: Geometry.Vector = new Geometry.Vector(
                v.x / length,
                v.y / length,
                v.z / length
            );
            return result;
        }
    };

    // TODO: Warning - using nested classes may cause compilation problems.
    public static Ray = class {
        public readonly point: Geometry.Point;
    
        public readonly vector: Geometry.Vector;
    
        public constructor(
                point: Geometry.Point,
                vector: Geometry.Vector) {
            this.point = point;
            this.vector = vector;
        }
    };

    public static intersects(
            box: Geometry.Box,
            ray: Geometry.Ray) : boolean {
        let index: number = 0;
        let k: number;
        let x: number = Float.MIN_VALUE;
        let y: number = Float.MIN_VALUE;
        let z: number = Float.MIN_VALUE;
        while (index < box.coordBox.length) {
            switch (index) {
                case (Geometry.Box.LEFT):
                case (Geometry.Box.RIGHT):
                    k = (box.coordBox[index] - ray.point.x) / ray.vector.x;
                    x = box.coordBox[index];
                    y = ray.point.y + k * ray.vector.y;
                    z = ray.point.z + k * ray.vector.z;
                    break;
                case (Geometry.Box.BEHIND):
                case (Geometry.Box.FRONT):
                    k = (box.coordBox[index] - ray.point.y) / ray.vector.y;
                    x = ray.point.x + k * ray.vector.x;
                    y = box.coordBox[index];
                    z = ray.point.z + k * ray.vector.z;
                    break;
                case (Geometry.Box.UP):
                case (Geometry.Box.DOWN):
                    k = (box.coordBox[index] - ray.point.z) / ray.vector.z;
                    x = ray.point.x + k * ray.vector.x;
                    y = ray.point.y + k * ray.vector.y;
                    z = box.coordBox[index];
                    break;
            }
            if (x >= box.coordBox[Geometry.Box.LEFT] && x <= box.coordBox[Geometry.Box.RIGHT] && y >= box.coordBox[Geometry.Box.FRONT] && y <= box.coordBox[Geometry.Box.BEHIND] && z >= box.coordBox[Geometry.Box.DOWN] && z <= box.coordBox[Geometry.Box.UP]) return true;
            index++;
        }
        return false;
    }

    public static vectorBetween(
            from: Geometry.Point,
            to: Geometry.Point) : Geometry.Vector {
        return new Geometry.Vector(
            to.x - from.x,
            to.y - from.y,
            to.z - from.z
        );
    }

    public static intersectionPointWitboxPlate(ray: Geometry.Ray) : Geometry.Point {
        let k: number = (0 - ray.point.z) / ray.vector.z;
        let x: number = ray.point.x + k * ray.vector.x;
        let y: number = ray.point.y + k * ray.vector.y;
        let z: number = 0;
        return new Geometry.Point(
            x,
            y,
            z
        );
    }

    public static overlaps(
            maxX: number,
            minX: number,
            maxY: number,
            minY: number,
            d: 
                // TODO: Warning - type not found in scope.
            DataStorage) : boolean {
        let maxX2: number = d.getMaxX();
        let maxY2: number = d.getMaxY();
        let minX2: number = d.getMinX();
        let minY2: number = d.getMinY();
        if (((maxX >= minX2 && maxX <= maxX2) || (minX <= maxX2 && minX >= minX2) || (minX >= minX2 && maxX <= maxX2)) && ((maxY >= minY2 && maxY <= maxY2) || (minY <= maxY2 && minY >= minY2) || (minY >= minY2 && maxY <= maxY2))) {
            return true;
        }
        if (((maxX2 >= minX && maxX2 <= maxX) || (minX2 <= maxX && minX2 >= minX) || (minX2 >= minX && maxX2 <= maxX)) && ((maxY2 >= minY && maxY2 <= maxY) || (minY2 <= maxY && minY2 >= minY) || (minY2 >= minY && maxY2 <= maxY))) {
            return true;
        }
        if (((minX >= minX2 && maxX <= maxX2) && (maxY >= maxY2 && minY <= minY2)) || ((minX2 >= minX && maxX2 <= maxX) && (maxY2 >= maxY && minY2 <= minY))) {
            return true;
        }
        return false;
    }

    public static relocateIfOverlaps(objects: List<DataStorage>) : boolean {
        let objectToFit: number = objects.size() - 1;
        let data: 
            // TODO: Warning - type not found in scope.
        DataStorage;
        try {
            data = objects.get(objectToFit);
        } catch (e) {
            if (e instanceof ArrayIndexOutOfBoundsException) {
                
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.e.printStackTrace();
                return false;
            }
        }
        let overlaps: boolean = false;
        for (let i: number = 0; i < objects.size(); i++) {
            if (i != objectToFit && 
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.overlaps(
                data.getMaxX(),
                data.getMinX(),
                data.getMaxY(),
                data.getMinY(),
                objects.get(i)
            )) {
                overlaps = true;
                break;
            }
        }
        if (!overlaps) return false;
        let width: number = data.getMaxX() - data.getMinX();
        let deep: number = data.getMaxY() - data.getMinY();
        let setMinX: number = Float.MAX_VALUE;
        let index: number = -1;
        let newMaxX: number;
        let newMinX: number;
        let newMaxY: number;
        let newMinY: number;
        for (let i: number = 0; i < objects.size(); i++) {
            if (i != objectToFit) {
                let d: 
                    // TODO: Warning - type not found in scope.
                DataStorage = objects.get(i);
                if (d.getMinX() < setMinX) {
                    setMinX = d.getMinX();
                    index = i;
                }
                newMaxX = d.getMaxX();
                newMinX = d.getMinX();
                newMaxY = d.getLastCenter().y + Math.abs(d.getMaxY() - d.getLastCenter().y) + deep + Geometry.OFFSET;
                newMinY = d.getLastCenter().y + Math.abs(d.getMaxY() - d.getLastCenter().y) + Geometry.OFFSET;
                if (Geometry.isValidPosition(
                    newMaxX,
                    newMinX,
                    newMaxY,
                    newMinY,
                    objects,
                    objectToFit
                )) {
                    Geometry.changeModelToFit(
                        newMaxX,
                        newMinX,
                        newMaxY,
                        newMinY,
                        data
                    );
                    break;
                }
                newMaxX = d.getLastCenter().x + Math.abs(d.getMaxX() - d.getLastCenter().x) + width + Geometry.OFFSET;
                newMinX = d.getLastCenter().x + Math.abs(d.getMaxX() - d.getLastCenter().x) + Geometry.OFFSET;
                newMaxY = d.getMaxY();
                newMinY = d.getMinY();
                if (Geometry.isValidPosition(
                    newMaxX,
                    newMinX,
                    newMaxY,
                    newMinY,
                    objects,
                    objectToFit
                )) {
                    Geometry.changeModelToFit(
                        newMaxX,
                        newMinX,
                        newMaxY,
                        newMinY,
                        data
                    );
                    break;
                }
                newMaxX = d.getMaxX();
                newMinX = d.getMinX();
                newMaxY = d.getLastCenter().y - (Math.abs(d.getMinY() - d.getLastCenter().y) + Geometry.OFFSET);
                newMinY = d.getLastCenter().y - (Math.abs(d.getMinY() - d.getLastCenter().y) + deep + Geometry.OFFSET);
                if (Geometry.isValidPosition(
                    newMaxX,
                    newMinX,
                    newMaxY,
                    newMinY,
                    objects,
                    objectToFit
                )) {
                    Geometry.changeModelToFit(
                        newMaxX,
                        newMinX,
                        newMaxY,
                        newMinY,
                        data
                    );
                    break;
                }
                newMaxX = d.getLastCenter().x - (Math.abs(d.getMinX() - d.getLastCenter().x) + Geometry.OFFSET);
                newMinX = d.getLastCenter().x - (Math.abs(d.getMinX() - d.getLastCenter().x) + width + Geometry.OFFSET);
                newMaxY = d.getMaxY();
                newMinY = d.getMinY();
                if (Geometry.isValidPosition(
                    newMaxX,
                    newMinX,
                    newMaxY,
                    newMinY,
                    objects,
                    objectToFit
                )) {
                    Geometry.changeModelToFit(
                        newMaxX,
                        newMinX,
                        newMaxY,
                        newMinY,
                        data
                    );
                    break;
                } else if (i == objects.size() - 2) {
                    return false;
                }
            }
        }
        return true;
    }

    public static isValidPosition(
            newMaxX: number,
            newMinX: number,
            newMaxY: number,
            newMinY: number,
            objects: List<DataStorage>,
            object: number) : boolean {
        let overlaps: boolean = false;
        let outOfPlate: boolean = false;
        let k: number = 0;
        let auxPlate: number[] = 
            // TODO: Warning - no scope specified; assuming 'this'.
            this.ViewerMainFragment.getCurrentPlate();
        if (newMaxX > auxPlate[0] || newMinX < -auxPlate[0] || newMaxY > auxPlate[1] || newMinY < -auxPlate[1]) outOfPlate = true;
        while (!outOfPlate && !overlaps && k < objects.size()) {
            if (k != object) {
                if (
                    // TODO: Warning - no scope specified; assuming 'this'.
                    this.Geometry.overlaps(
                    newMaxX,
                    newMinX,
                    newMaxY,
                    newMinY,
                    objects.get(k)
                )) overlaps = true;
            }
            k++;
        }
        if (!outOfPlate && !overlaps) return true; else return false;
    }

    public static changeModelToFit(
            newMaxX: number,
            newMinX: number,
            newMaxY: number,
            newMinY: number,
            d: 
                // TODO: Warning - type not found in scope.
            DataStorage) : void {
        d.setMaxX(newMaxX);
        d.setMinX(newMinX);
        d.setMaxY(newMaxY);
        d.setMinY(newMinY);
        let newCenterX: number = newMinX + (newMaxX - newMinX) / 2;
        let newCenterY: number = newMinY + (newMaxY - newMinY) / 2;
        let newCenterZ: number = d.getLastCenter().z;
        let newCenter: Geometry.Point = new Geometry.Point(
            newCenterX,
            newCenterY,
            newCenterZ
        );
        d.setLastCenter(newCenter);
        let temporaryModel: number[] = function(d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(16);
        Matrix.setIdentityM(
            temporaryModel,
            0
        );
        Matrix.translateM(
            temporaryModel,
            0,
            d.getLastCenter().x,
            d.getLastCenter().y,
            d.getLastCenter().z
        );
        Matrix.scaleM(
            temporaryModel,
            0,
            d.getLastScaleFactorX(),
            d.getLastScaleFactorY(),
            d.getLastScaleFactorZ()
        );
        Matrix.translateM(
            temporaryModel,
            0,
            0,
            0,
            d.getAdjustZ()
        );
        let rotateObjectMatrix: number[] = d.getRotationMatrix();
        let modelMatrix: number[] = function(d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            let r = [];
            for (let i = 0; i < d; i++) r.push(0);
            return r;
        }(16);
        Matrix.multiplyMM(
            modelMatrix,
            0,
            temporaryModel,
            0,
            rotateObjectMatrix,
            0
        );
        d.setModelMatrix(modelMatrix);
    }
}
