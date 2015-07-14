/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
/// <reference path="./VertexMapBase.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
        var VertexToFaceMap = (function (_super) {
            __extends(VertexToFaceMap, _super);
            function VertexToFaceMap() {
                _super.apply(this, arguments);
                // a map of vertex keys to faces.
                this.map = {};
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
                        allFaces.concat(_this.map[_this.getMapKey(vertex)]);
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
            return VertexToFaceMap;
        })(Renderer.VertexMapBase);
        Renderer.VertexToFaceMap = VertexToFaceMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=VertexToFaceMap.js.map