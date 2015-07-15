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
        var VertexToLineMap = (function (_super) {
            __extends(VertexToLineMap, _super);
            function VertexToLineMap() {
                _super.apply(this, arguments);
                // a map of vertex keys to lines.
                this.map = {};
            }
            // adds a line (defined by two THREE.Vector3's) to the map.
            // note that each line will appear in the map twice - once for each point
            VertexToLineMap.prototype.addLine = function (vertex1, vertex2) {
                var _this = this;
                [vertex1, vertex2].forEach(function (v) {
                    var vertexMapKey = Renderer.VertexMapBase.GetMapKey(v);
                    _this.map[vertexMapKey] = _this.map[vertexMapKey] || [];
                    _this.map[vertexMapKey].push({
                        vertex1: vertex1,
                        vertex2: vertex2
                    });
                });
            };
            // returns a list of unique lines that contain the given vertex
            VertexToLineMap.prototype.getLines = function (vertex) {
                return this.map[Renderer.VertexMapBase.GetMapKey(vertex)];
            };
            return VertexToLineMap;
        })(Renderer.VertexMapBase);
        Renderer.VertexToLineMap = VertexToLineMap;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=VertexToLineMap.js.map