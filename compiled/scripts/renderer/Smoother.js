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
                this.edgeMap = new Renderer.EdgeMap();
            }
            Smoother.prototype.CombineAndSmooth = function (geometries, optionalLines, quadLines) {
                var _this = this;
                this.edgeMap.addGeometries(geometries);
                var optionalLineLookup = {};
                optionalLines.forEach(function (ol) {
                    optionalLineLookup[_this.edgeMap.GetMapKey(ol.vertex1, ol.vertex2)] = ol;
                });
                var geometryGroups = [];
                while (geometries.length > 0) {
                    var currentGeometry = geometries.shift();
                    var currentGeometryGroup = this.getConnectedGeometriesGroup(currentGeometry, optionalLineLookup);
                    currentGeometryGroup.forEach(function (geom) {
                        geometries.splice(geometries.indexOf(geom), 1);
                    });
                    geometryGroups.push(currentGeometryGroup);
                }
                var emptyMatrix = new THREE.Matrix4();
                var smoothedGeometries = [];
                geometryGroups.forEach(function (group) {
                    var combinedGeom = new THREE.Geometry();
                    group.forEach(function (geom) {
                        combinedGeom.merge(geom, emptyMatrix, 0);
                    });
                    combinedGeom.computeFaceNormals();
                    combinedGeom.mergeVertices();
                    combinedGeom.computeVertexNormals();
                    smoothedGeometries.push(combinedGeom);
                });
                var finalGeom = new THREE.Geometry();
                smoothedGeometries.forEach(function (geom) {
                    finalGeom.merge(geom, emptyMatrix, 0);
                });
                return finalGeom;
                // for (var lineKey in quadLines) {
                // 	if (quadLines.hasOwnProperty(lineKey)) {
                // 		var quadHalves = edgeMap.getFacesFromLineKey(lineKey);
                // 		if (quadHalves) {
                // 			quadHalves.face1.vertexNormals[0] = quadHalves.face2.vertexNormals[2].clone();
                // 			quadHalves.face2.vertexNormals[0] = quadHalves.face1.vertexNormals[2].clone();
                // 		}
                // 	}
                // }
            };
            // returns all geometries connected to the provided geometry.
            // the returned array includes the provided geometry.
            Smoother.prototype.getConnectedGeometriesGroup = function (geometry, optionalLineLookup, geometries) {
                var _this = this;
                if (geometries === void 0) { geometries = []; }
                geometries.push(geometry);
                geometry.faces.forEach(function (f) {
                    [
                        { vertex1: f.a, vertex2: f.b },
                        { vertex1: f.b, vertex2: f.c },
                        { vertex1: f.c, vertex2: f.a },
                    ].forEach(function (edge) {
                        var edgeKey = _this.edgeMap.GetMapKey(geometry.vertices[edge.vertex1], geometry.vertices[edge.vertex2]);
                        if (optionalLineLookup[edgeKey]) {
                            var adjacentGeometries = _this.edgeMap.getGeometriesFromKey(edgeKey);
                            if (adjacentGeometries.length > 0) {
                                adjacentGeometries.forEach(function (geom) {
                                    if (geometries.indexOf(geom) === -1) {
                                        _this.getConnectedGeometriesGroup(geom, optionalLineLookup, geometries);
                                    }
                                });
                            }
                        }
                    });
                });
                return geometries;
            };
            return Smoother;
        })();
        Renderer.Smoother = Smoother;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=Smoother.js.map