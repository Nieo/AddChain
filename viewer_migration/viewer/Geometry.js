"use strict";
// package android.app.printerapp.viewer;
Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = require("./android/opengl/Matrix");
var Geometry = (function () {
    function Geometry() {
    }
    Geometry.intersects = function (box, ray) {
        var index = 0;
        var k;
        var x = Float.MIN_VALUE;
        var y = Float.MIN_VALUE;
        var z = Float.MIN_VALUE;
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
            if (x >= box.coordBox[Geometry.Box.LEFT] && x <= box.coordBox[Geometry.Box.RIGHT] && y >= box.coordBox[Geometry.Box.FRONT] && y <= box.coordBox[Geometry.Box.BEHIND] && z >= box.coordBox[Geometry.Box.DOWN] && z <= box.coordBox[Geometry.Box.UP])
                return true;
            index++;
        }
        return false;
    };
    Geometry.vectorBetween = function (from, to) {
        return new Geometry.Vector(to.x - from.x, to.y - from.y, to.z - from.z);
    };
    Geometry.intersectionPointWitboxPlate = function (ray) {
        var k = (0 - ray.point.z) / ray.vector.z;
        var x = ray.point.x + k * ray.vector.x;
        var y = ray.point.y + k * ray.vector.y;
        var z = 0;
        return new Geometry.Point(x, y, z);
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
        var objectToFit = objects.size() - 1;
        var data;
        try {
            data = objects.get(objectToFit);
        }
        catch (e) {
            if (e instanceof ArrayIndexOutOfBoundsException) {
                // TODO: Warning - no scope specified; assuming 'this'.
                this.e.printStackTrace();
                return false;
            }
        }
        var overlaps = false;
        for (var i = 0; i < objects.size(); i++) {
            if (i != objectToFit &&
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.overlaps(data.getMaxX(), data.getMinX(), data.getMaxY(), data.getMinY(), objects.get(i))) {
                overlaps = true;
                break;
            }
        }
        if (!overlaps)
            return false;
        var width = data.getMaxX() - data.getMinX();
        var deep = data.getMaxY() - data.getMinY();
        var setMinX = Float.MAX_VALUE;
        var index = -1;
        var newMaxX;
        var newMinX;
        var newMaxY;
        var newMinY;
        for (var i = 0; i < objects.size(); i++) {
            if (i != objectToFit) {
                var d = objects.get(i);
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
                else if (i == objects.size() - 2) {
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
        var auxPlate = 
        // TODO: Warning - no scope specified; assuming 'this'.
        this.ViewerMainFragment.getCurrentPlate();
        if (newMaxX > auxPlate[0] || newMinX < -auxPlate[0] || newMaxY > auxPlate[1] || newMinY < -auxPlate[1])
            outOfPlate = true;
        while (!outOfPlate && !overlaps && k < objects.size()) {
            if (k != object) {
                if (
                // TODO: Warning - no scope specified; assuming 'this'.
                this.Geometry.overlaps(newMaxX, newMinX, newMaxY, newMinY, objects.get(k)))
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
        var newCenter = new Geometry.Point(newCenterX, newCenterY, newCenterZ);
        d.setLastCenter(newCenter);
        var temporaryModel = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        Matrix_1.Matrix.setIdentityM(temporaryModel, 0);
        Matrix_1.Matrix.translateM(temporaryModel, 0, d.getLastCenter().x, d.getLastCenter().y, d.getLastCenter().z);
        Matrix_1.Matrix.scaleM(temporaryModel, 0, d.getLastScaleFactorX(), d.getLastScaleFactorY(), d.getLastScaleFactorZ());
        Matrix_1.Matrix.translateM(temporaryModel, 0, 0, 0, d.getAdjustZ());
        var rotateObjectMatrix = d.getRotationMatrix();
        var modelMatrix = function (d) {
            // new float[16]
            // TODO: Consider refactoring this array initialization to be more readable.
            var r = [];
            for (var i = 0; i < d; i++)
                r.push(0);
            return r;
        }(16);
        Matrix_1.Matrix.multiplyMM(modelMatrix, 0, temporaryModel, 0, rotateObjectMatrix, 0);
        d.setModelMatrix(modelMatrix);
    };
    return Geometry;
}());
Geometry.OFFSET = 20;
// TODO: Warning - using nested classes may cause compilation problems.
Geometry.Point = (function () {
    function class_1(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return class_1;
}());
// TODO: Warning - using nested classes may cause compilation problems.
Geometry.Box = (_a = (function () {
        function class_2(minX, maxX, minY, maxY, minZ, maxZ) {
            this.coordBox = function (d) {
                // new float[6]
                // TODO: Consider refactoring this array initialization to be more readable.
                var r = [];
                for (var i = 0; i < d; i++)
                    r.push(0);
                return r;
            }(6);
            this.coordBox[Geometry.Box.LEFT] = minX;
            this.coordBox[Geometry.Box.RIGHT] = maxX;
            this.coordBox[Geometry.Box.FRONT] = minY;
            this.coordBox[Geometry.Box.BEHIND] = maxY;
            this.coordBox[Geometry.Box.DOWN] = minZ;
            this.coordBox[Geometry.Box.UP] = maxZ;
        }
        return class_2;
    }()),
    _a.LEFT = 0,
    _a.RIGHT = 1,
    _a.FRONT = 2,
    _a.BEHIND = 3,
    _a.DOWN = 4,
    _a.UP = 5,
    _a);
// TODO: Warning - using nested classes may cause compilation problems.
Geometry.Vector = (function () {
    function class_3(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    class_3.substract = function (v1, v2) {
        var x = v1.x - v2.x;
        var y = v1.y - v2.y;
        var z = v1.z - v2.z;
        var substract = new Geometry.Vector(x, y, z);
        return substract;
    };
    class_3.crossProduct = function (v, v2) {
        var x = (v.y * v2.z) - (v.z * v2.y);
        var y = (v.z * v2.x) - (v.x * v2.z);
        var z = (v.x * v2.y) - (v.y * v2.x);
        var result = new Geometry.Vector(x, y, z);
        return result;
    };
    class_3.normalize = function (v) {
        var length = (number), Math, sqrt = (v.x * v.x + v.y * v.y + v.z * v.z);
        var result = new Geometry.Vector(v.x / length, v.y / length, v.z / length);
        return result;
    };
    return class_3;
}());
// TODO: Warning - using nested classes may cause compilation problems.
Geometry.Ray = (function () {
    function class_4(point, vector) {
        this.point = point;
        this.vector = vector;
    }
    return class_4;
}());
exports.Geometry = Geometry;
var _a;
