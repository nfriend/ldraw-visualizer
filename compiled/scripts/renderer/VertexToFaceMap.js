/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        (function (Face3VertexIndex) {
            Face3VertexIndex[Face3VertexIndex["A"] = 0] = "A";
            Face3VertexIndex[Face3VertexIndex["B"] = 1] = "B";
            Face3VertexIndex[Face3VertexIndex["C"] = 2] = "C";
        })(Renderer.Face3VertexIndex || (Renderer.Face3VertexIndex = {}));
        var Face3VertexIndex = Renderer.Face3VertexIndex;
        var VertexToFaceMap = (function () {
            function VertexToFaceMap() {
                // a map of vertex keys to faces.
                this.map = {};
                // how close the vertices must be to be considered the same point
                this.precision = 10000;
            }
            // adds all of the faces in the geometry to the map, indexed by their vertices.
            // note each face will appear in the internal map 3 times, once for each vertex
            VertexToFaceMap.prototype.addGeometry = function (geometry) {
                var _this = this;
                geometry.faces.forEach(function (f) {
                    [f.a, f.b, f.c].forEach(function (vertexIndex, index) {
                        var vertexMapKey = _this.getMapKey(geometry.vertices[vertexIndex]);
                        _this.map[vertexMapKey] = _this.map[vertexMapKey] || [];
                        _this.map[vertexMapKey].push({
                            face: f,
                            matchingVertexIndex: index
                        });
                    });
                });
            };
            // returns a list of unique faces that contain the given vertex
            VertexToFaceMap.prototype.getFaces = function (vertex) {
                var _this = this;
                if (LdrawVisualizer.Utility.isArray(vertex)) {
                    var allFaces = [];
                    vertex.forEach(function (v) {
                        var faces = _this.map[_this.getMapKey(v)];
                        if (faces) {
                            allFaces = allFaces.concat(faces);
                        }
                    });
                    var uniqueFaces = allFaces.filter(function (value, index, self) {
                        return self.indexOf(value) === index;
                    });
                    return uniqueFaces;
                }
                else {
                    return this.map[this.getMapKey(vertex)];
                }
            };
            VertexToFaceMap.prototype.getFacesFromVertexKey = function (vertexKey) {
                return this.map[vertexKey];
            };
            // returns a string key based on three vertices of a point
            VertexToFaceMap.prototype.getMapKey = function (vertex) {
                return [Math.round(vertex.x * this.precision),
                    Math.round(vertex.y * this.precision),
                    Math.round(vertex.z * this.precision)].join('|');
            };
            return VertexToFaceMap;
        })();
        Renderer.VertexToFaceMap = VertexToFaceMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=VertexToFaceMap.js.map