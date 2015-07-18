/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var VertexToLineMap = (function () {
            function VertexToLineMap() {
                // a map of vertex keys to lines.
                this.map = {};
                // how close the vertices must be to be considered the same point
                this.precision = 10000;
            }
            // adds a line (defined by two THREE.Vector3's) to the map.
            // note that each line will appear in the map twice - once for each point
            VertexToLineMap.prototype.addLine = function (vertex1, vertex2) {
                var _this = this;
                [vertex1, vertex2].forEach(function (v) {
                    var vertexMapKey = _this.getMapKey(v);
                    _this.map[vertexMapKey] = _this.map[vertexMapKey] || [];
                    _this.map[vertexMapKey].push({
                        vertex1: vertex1,
                        vertex2: vertex2
                    });
                });
            };
            // returns a list of unique lines that contain the given vertex
            VertexToLineMap.prototype.getLines = function (vertex) {
                return this.map[this.getMapKey(vertex)];
            };
            // returns a string key based on three vertices of a point
            VertexToLineMap.prototype.getMapKey = function (vertex) {
                return [Math.round(vertex.x * this.precision),
                    Math.round(vertex.y * this.precision),
                    Math.round(vertex.z * this.precision)].join('|');
            };
            return VertexToLineMap;
        })();
        Renderer.VertexToLineMap = VertexToLineMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=VertexToLineMap.js.map