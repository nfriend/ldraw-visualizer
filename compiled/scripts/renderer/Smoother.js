/// <reference path="../../typings/references.ts" />
/// <reference path="../Utility.ts" />
/// <reference path="./VertexToFaceMap" />
/// <reference path="./VertexToLineMap" />
/// <reference path="./EdgeMap" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var Smoother = (function () {
            function Smoother() {
            }
            Smoother.Smooth = function (geometry, optionalLines) {
                var _this = this;
                geometry.computeVertexNormals();
                geometry.mergeVertices();
                geometry.computeFaceNormals();
                var faceMap = new Renderer.VertexToFaceMap();
                faceMap.addGeometry(geometry);
                var edgeMap = new Renderer.EdgeMap();
                edgeMap.addGeometry(geometry);
                var verticesToBeAveraged = {};
                optionalLines.forEach(function (optLine) {
                    var sharedFaces = edgeMap.getFaces(optLine.vertex1, optLine.vertex2);
                    var mapKey1 = _this.getMapKey(optLine.vertex1);
                    var mapKey2 = _this.getMapKey(optLine.vertex2);
                    if (!verticesToBeAveraged[mapKey1]) {
                        verticesToBeAveraged[mapKey1] = [];
                    }
                    if (!verticesToBeAveraged[mapKey2]) {
                        verticesToBeAveraged[mapKey2] = [];
                    }
                    verticesToBeAveraged[mapKey1].push(sharedFaces.face1);
                    verticesToBeAveraged[mapKey1].push(sharedFaces.face2);
                    verticesToBeAveraged[mapKey2].push(sharedFaces.face1);
                    verticesToBeAveraged[mapKey2].push(sharedFaces.face2);
                });
                for (var vertexKey in verticesToBeAveraged) {
                    if (verticesToBeAveraged.hasOwnProperty(vertexKey)) {
                        var facesToBeAveraged = verticesToBeAveraged[vertexKey];
                        var normal = new THREE.Vector3();
                        facesToBeAveraged.forEach(function (face) {
                            normal.add(face.normal);
                        });
                        normal.normalize();
                        if (normal.x > 1 || normal.x < -1 || normal.y > 1 || normal.y < -1 || normal.z > 1 || normal.z < -1) {
                            console.log('greater');
                        }
                        console.log(normal.x, normal.y, normal.z);
                        var allFacesAtCurrentVertex = faceMap.getFacesFromVertexKey(vertexKey);
                        // TODO: eliminate all faces from this array that weren't part of the original
                        // facesToBeAveraged Array AND aren't an original face's quad sibling
                        allFacesAtCurrentVertex.forEach(function (faceContainer) {
                            faceContainer.face.vertexNormals[faceContainer.matchingVertexIndex] = normal;
                        });
                    }
                }
            };
            // returns a string key based on three vertices of a point
            Smoother.getMapKey = function (vertex) {
                return [Math.round(vertex.x * this.precision),
                    Math.round(vertex.y * this.precision),
                    Math.round(vertex.z * this.precision)].join('|');
            };
            // how close the vertices must be to be considered the same point
            Smoother.precision = 10000;
            return Smoother;
        })();
        Renderer.Smoother = Smoother;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=Smoother.js.map