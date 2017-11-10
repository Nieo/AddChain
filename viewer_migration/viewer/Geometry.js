"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var GLMatrix_1 = require("./GLMatrix");
var Box = (function () {
    function Box(minX, maxX, minY, maxY, minZ, maxZ) {
        this.coordBox = function (d) {
            // new float[6]
            // TODO: Consider refactorihttps://www.reddit.com/r/all/ng this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(6);
        this.coordBox[Box.LEFT] = minX;
        this.coordBox[Box.RIGHT] = maxX;
        this.coordBox[Box.FRONT] = minY;
        this.coordBox[Box.BEHIND] = maxY;
        this.coordBox[Box.DOWN] = minZ;
        this.coordBox[Box.UP] = maxZ;
    }
    return Box;
}());
Box.LEFT = 0;
Box.RIGHT = 1;
Box.FRONT = 2;
Box.BEHIND = 3;
Box.DOWN = 4;
Box.UP = 5;
exports.Box = Box;
var Point = (function () {
    function Point(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Point;
}());
exports.Point = Point;
var Vector = (function () {
    function Vector(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.substract = function (v1, v2) {
        var x = v1.x - v2.x;
        var y = v1.y - v2.y;
        var z = v1.z - v2.z;
        var substract = new Vector(x, y, z);
        return substract;
    };
    Vector.crossProduct = function (v, v2) {
        var x = (v.y * v2.z) - (v.z * v2.y);
        var y = (v.z * v2.x) - (v.x * v2.z);
        var z = (v.x * v2.y) - (v.y * v2.x);
        var result = new Vector(x, y, z);
        return result;
    };
    Vector.normalize = function (v) {
        var length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
        var result = new Vector(v.x / length, v.y / length, v.z / length);
        return result;
    };
    return Vector;
}());
exports.Vector = Vector;
var Ray = (function () {
    function Ray(point, vector) {
        this.point = point;
        this.vector = vector;
    }
    return Ray;
}());
exports.Ray = Ray;
var Geometry = (function () {
    function Geometry() {
    }
    // TODO: Warning - using nested classes may cause compilation problems.
    // TODO: Warning - using nested classes may cause compilation problems.
    Geometry.intersects = function (box, ray) {
        var index = 0;
        var k;
        var x = Number.MIN_VALUE;
        var y = Number.MIN_VALUE;
        var z = Number.MIN_VALUE;
        while (index < box.coordBox.length) {
            switch (index) {
                case (Box.LEFT):
                case (Box.RIGHT):
                    k = (box.coordBox[index] - ray.point.x) / ray.vector.x;
                    x = box.coordBox[index];
                    y = ray.point.y + k * ray.vector.y;
                    z = ray.point.z + k * ray.vector.z;
                    break;
                case (Box.BEHIND):
                case (Box.FRONT):
                    k = (box.coordBox[index] - ray.point.y) / ray.vector.y;
                    x = ray.point.x + k * ray.vector.x;
                    y = box.coordBox[index];
                    z = ray.point.z + k * ray.vector.z;
                    break;
                case (Box.UP):
                case (Box.DOWN):
                    k = (box.coordBox[index] - ray.point.z) / ray.vector.z;
                    x = ray.point.x + k * ray.vector.x;
                    y = ray.point.y + k * ray.vector.y;
                    z = box.coordBox[index];
                    break;
            }
            if (x >= box.coordBox[Box.LEFT] && x <= box.coordBox[Box.RIGHT] && y >= box.coordBox[Box.FRONT] && y <= box.coordBox[Box.BEHIND] && z >= box.coordBox[Box.DOWN] && z <= box.coordBox[Box.UP])
                return true;
            index++;
        }
        return false;
    };
    Geometry.vectorBetween = function (from, to) {
        return new Vector(to.x - from.x, to.y - from.y, to.z - from.z);
    };
    Geometry.intersectionPointWitboxPlate = function (ray) {
        var k = (0 - ray.point.z) / ray.vector.z;
        var x = ray.point.x + k * ray.vector.x;
        var y = ray.point.y + k * ray.vector.y;
        var z = 0;
        return new Point(x, y, z);
    };
    Geometry.overlaps = function (maxX, minX, maxY, minY, d) {
        var maxX2 = d.getMaxX();
        var maxY2 = d.getMaxY();
        var minX2 = d.getMinX();
        var minY2 = d.getMinY();
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
    };
    Geometry.relocateIfOverlaps = function (objects) {
        var objectToFit = objects.length - 1;
        var data;
        try {
            data = objects[objectToFit];
        }
        catch (e) {
            if (e instanceof RangeError) {
                console.log(e.message); //conversion to Error type
                return false;
            }
        }
        var overlaps = false;
        for (var i = 0; i < objects.length; i++) {
            if (i != objectToFit &&
                // TODO: Warning - no scope specified; assuming 'this'.
                this.overlaps(data.getMaxX(), data.getMinX(), data.getMaxY(), data.getMinY(), objects[i])) {
                overlaps = true;
                break;
            }
        }
        if (!overlaps)
            return false;
        var width = data.getMaxX() - data.getMinX();
        var deep = data.getMaxY() - data.getMinY();
        var setMinX = Number.MAX_VALUE;
        var index = -1;
        var newMaxX;
        var newMinX;
        var newMaxY;
        var newMinY;
        for (var i = 0; i < objects.length; i++) {
            if (i != objectToFit) {
                var d = objects[i];
                if (d.getMinX() < setMinX) {
                    setMinX = d.getMinX();
                    index = i;
                }
                newMaxX = d.getMaxX();
                newMinX = d.getMinX();
                newMaxY = d.getLastCenter().y + Math.abs(d.getMaxY() - d.getLastCenter().y) + deep + Geometry.OFFSET;
                newMinY = d.getLastCenter().y + Math.abs(d.getMaxY() - d.getLastCenter().y) + Geometry.OFFSET;
                if (Geometry.isValidPosition(newMaxX, newMinX, newMaxY, newMinY, objects, objectToFit)) {
                    Geometry.changeModelToFit(newMaxX, newMinX, newMaxY, newMinY, data);
                    break;
                }
                newMaxX = d.getLastCenter().x + Math.abs(d.getMaxX() - d.getLastCenter().x) + width + Geometry.OFFSET;
                newMinX = d.getLastCenter().x + Math.abs(d.getMaxX() - d.getLastCenter().x) + Geometry.OFFSET;
                newMaxY = d.getMaxY();
                newMinY = d.getMinY();
                if (Geometry.isValidPosition(newMaxX, newMinX, newMaxY, newMinY, objects, objectToFit)) {
                    Geometry.changeModelToFit(newMaxX, newMinX, newMaxY, newMinY, data);
                    break;
                }
                newMaxX = d.getMaxX();
                newMinX = d.getMinX();
                newMaxY = d.getLastCenter().y - (Math.abs(d.getMinY() - d.getLastCenter().y) + Geometry.OFFSET);
                newMinY = d.getLastCenter().y - (Math.abs(d.getMinY() - d.getLastCenter().y) + deep + Geometry.OFFSET);
                if (Geometry.isValidPosition(newMaxX, newMinX, newMaxY, newMinY, objects, objectToFit)) {
                    Geometry.changeModelToFit(newMaxX, newMinX, newMaxY, newMinY, data);
                    break;
                }
                newMaxX = d.getLastCenter().x - (Math.abs(d.getMinX() - d.getLastCenter().x) + Geometry.OFFSET);
                newMinX = d.getLastCenter().x - (Math.abs(d.getMinX() - d.getLastCenter().x) + width + Geometry.OFFSET);
                newMaxY = d.getMaxY();
                newMinY = d.getMinY();
                if (Geometry.isValidPosition(newMaxX, newMinX, newMaxY, newMinY, objects, objectToFit)) {
                    Geometry.changeModelToFit(newMaxX, newMinX, newMaxY, newMinY, data);
                    break;
                }
                else if (i == objects.length - 2) {
                    return false;
                }
            }
        }
        return true;
    };
    Geometry.isValidPosition = function (newMaxX, newMinX, newMaxY, newMinY, objects, object) {
        var overlaps = false;
        var outOfPlate = false;
        var k = 0;
        // let auxPlate: number[] =
        //     // TODO: Warning - no scope specified; assuming 'this'.
        //     this.ViewerMainFragment.getCurrentPlate();
        // if (newMaxX > auxPlate[0] || newMinX < -auxPlate[0] || newMaxY > auxPlate[1] || newMinY < -auxPlate[1]) outOfPlate = true;
        while (!outOfPlate && !overlaps && k < objects.length) {
            if (k != object) {
                if (
                // TODO: Warning - no scope specified; assuming 'this'.
                this.overlaps(newMaxX, newMinX, newMaxY, newMinY, objects[k]))
                    overlaps = true;
            }
            k++;
        }
        if (!outOfPlate && !overlaps)
            return true;
        else
            return false;
    };
    Geometry.changeModelToFit = function (newMaxX, newMinX, newMaxY, newMinY, d) {
        d.setMaxX(newMaxX);
        d.setMinX(newMinX);
        d.setMaxY(newMaxY);
        d.setMinY(newMinY);
        var newCenterX = newMinX + (newMaxX - newMinX) / 2;
        var newCenterY = newMinY + (newMaxY - newMinY) / 2;
        var newCenterZ = d.getLastCenter().z;
        var newCenter = new Point(newCenterX, newCenterY, newCenterZ);
        d.setLastCenter(newCenter);
        var temporaryModel = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        GLMatrix_1.Matrix.setIdentityM(temporaryModel, 0);
        GLMatrix_1.Matrix.translateM(temporaryModel, 0, d.getLastCenter().x, d.getLastCenter().y, d.getLastCenter().z);
        GLMatrix_1.Matrix.scaleM(temporaryModel, 0, d.getLastScaleFactorX(), d.getLastScaleFactorY(), d.getLastScaleFactorZ());
        GLMatrix_1.Matrix.translateM(temporaryModel, 0, 0, 0, d.getAdjustZ());
        var rotateObjectMatrix = d.getRotationMatrix();
        var modelMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        GLMatrix_1.Matrix.multiplyMM(modelMatrix, 0, temporaryModel, 0, rotateObjectMatrix, 0);
        d.setModelMatrix(modelMatrix);
    };
    return Geometry;
}());
Geometry.OFFSET = 20;
exports.Geometry = Geometry;
