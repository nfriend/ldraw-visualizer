/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var VertexMapBase = (function () {
            function VertexMapBase() {
            }
            // returns a string key based on three vertices of a point
            VertexMapBase.GetMapKey = function (vertex) {
                return [Math.round(vertex.x * this.precision),
                    Math.round(vertex.y * this.precision),
                    Math.round(vertex.z * this.precision)].join('|');
            };
            // how close the vertices must be to be considered the same point
            VertexMapBase.precision = 10000;
            return VertexMapBase;
        })();
        Renderer.VertexMapBase = VertexMapBase;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=VertexMapBase.js.map