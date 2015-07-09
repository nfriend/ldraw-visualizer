/// <reference path="../../typings/references.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var EdgeMap = (function () {
            function EdgeMap() {
                // how close the vertices must be to be considered the same point
                this.epsilon = 0.0001;
                // a map of edge keys to faces.
                this.map = {};
            }
            // adds all of the faces in the geometry to the map, indexed by their edges.
            // note each face will appear in the internal map 3 times, once for each of its edges
            EdgeMap.prototype.addGeometry = function (geometry) {
                var _this = this;
                geometry.faces.forEach(function (f) {
                    var edge1MapKey = _this.getMapKey(geometry.vertices[f.a], geometry.vertices[f.b]);
                    if (!_this.map[edge1MapKey]) {
                        _this.map[edge1MapKey] = [];
                    }
                    _this.map[edge1MapKey].push(f);
                    var edge2MapKey = _this.getMapKey(geometry.vertices[f.b], geometry.vertices[f.c]);
                    if (!_this.map[edge2MapKey]) {
                        _this.map[edge2MapKey] = [];
                    }
                    _this.map[edge2MapKey].push(f);
                    var edge3MapKey = _this.getMapKey(geometry.vertices[f.c], geometry.vertices[f.a]);
                    if (!_this.map[edge3MapKey]) {
                        _this.map[edge3MapKey] = [];
                    }
                    _this.map[edge3MapKey].push(f);
                });
            };
            // returns any faces that contain an edge defined by the given vertices
            EdgeMap.prototype.getFaces = function (vertex1, vertex2) {
                return this.map[this.getMapKey(vertex1, vertex2)];
            };
            // returns an order-independent string key based on all six data points of the two vertices
            EdgeMap.prototype.getMapKey = function (vertexA, vertexB) {
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
                return [Math.round(first.x * this.epsilon),
                    Math.round(first.y * this.epsilon),
                    Math.round(first.z * this.epsilon),
                    Math.round(second.x * this.epsilon),
                    Math.round(second.y * this.epsilon),
                    Math.round(second.z * this.epsilon)].join('|');
            };
            return EdgeMap;
        })();
        Renderer.EdgeMap = EdgeMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=EdgeMap.js.map