/// <reference path="../../typings/references.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var EdgeMap = (function () {
            function EdgeMap() {
                // how close the vertices must be to be considered the same point
                this.precision = 10000;
                // a map of edge keys to faces.
                this.map = {};
            }
            EdgeMap.prototype.addGeometry = function (geometry) {
                var _this = this;
                geometry.faces.forEach(function (f) {
                    [
                        { vertex1Index: f.a, vertex2Index: f.b },
                        { vertex1Index: f.b, vertex2Index: f.c },
                        { vertex1Index: f.c, vertex2Index: f.a }
                    ].forEach(function (edge, index) {
                        var mapKey = _this.GetMapKey(geometry.vertices[edge.vertex1Index], geometry.vertices[edge.vertex2Index]);
                        if (!_this.map[mapKey]) {
                            _this.map[mapKey] = [];
                        }
                        _this.map[mapKey].push(geometry);
                    });
                });
            };
            EdgeMap.prototype.addGeometries = function (geometries) {
                var _this = this;
                geometries.forEach(function (g) {
                    _this.addGeometry(g);
                });
            };
            EdgeMap.prototype.getGeometries = function (vertex1, vertex2) {
                return this.getGeometriesFromKey(this.GetMapKey(vertex1, vertex2));
            };
            EdgeMap.prototype.getGeometriesFromKey = function (edgeKey) {
                return this.map[edgeKey] || [];
            };
            // returns an order-independent string key based on all six data points of the two vertices
            EdgeMap.prototype.GetMapKey = function (vertexA, vertexB) {
                var first, second;
                if (vertexA.x < vertexB.x) {
                    first = vertexA;
                    second = vertexB;
                }
                else if (vertexA.x > vertexB.x) {
                    first = vertexB;
                    second = vertexA;
                }
                else {
                    if (vertexA.y < vertexB.y) {
                        first = vertexA;
                        second = vertexB;
                    }
                    else if (vertexA.y > vertexB.y) {
                        first = vertexB;
                        second = vertexA;
                    }
                    else {
                        if (vertexA.z < vertexB.z) {
                            first = vertexA;
                            second = vertexB;
                        }
                        else if (vertexA.z > vertexB.z) {
                            first = vertexB;
                            second = vertexA;
                        }
                        else {
                            // they're the same point
                            first = vertexA;
                            second = vertexB;
                        }
                    }
                }
                return [Math.round(first.x * this.precision),
                    Math.round(first.y * this.precision),
                    Math.round(first.z * this.precision),
                    Math.round(second.x * this.precision),
                    Math.round(second.y * this.precision),
                    Math.round(second.z * this.precision)].join('|');
            };
            return EdgeMap;
        })();
        Renderer.EdgeMap = EdgeMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=EdgeMap.js.map