/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />
/// <reference path="./ColorLookup.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var LdrawFileRenderer = (function () {
            function LdrawFileRenderer() {
            }
            LdrawFileRenderer.Render = function (scene, ldrawFile) {
                var geometries = this.render(ldrawFile);
                for (var prop in geometries) {
                    if (geometries.hasOwnProperty(prop)) {
                        var combinedGeom = new THREE.Geometry();
                        geometries[prop].forEach(function (g) {
                            combinedGeom.merge(g, new THREE.Matrix4(), 0);
                        });
                        var color = typeof Renderer.ColorLookup[prop] !== 'undefined' ? Renderer.ColorLookup[prop] : { hex: 0, alpha: 255 };
                        var legoMaterial = new THREE.MeshPhongMaterial({ color: color.hex, shading: THREE.SmoothShading, shininess: 30, side: THREE.DoubleSide });
                        if (color.alpha) {
                            legoMaterial.transparent = true;
                            legoMaterial.opacity = color.alpha / 255;
                        }
                        combinedGeom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(-1, -1, 1)));
                        scene.add(new THREE.Mesh(combinedGeom, legoMaterial));
                        console.log('added mesh: ' + prop);
                    }
                }
            };
            LdrawFileRenderer.render = function (ldrawFile, colorCode, fullMatrix, geometries) {
                if (colorCode === void 0) { colorCode = 0; }
                if (fullMatrix === void 0) { fullMatrix = new THREE.Matrix4(); }
                if (geometries === void 0) { geometries = {}; }
                // Render all quadrilaterals
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.Quadrilateral; })
                    .forEach(function (l) {
                    var quadLine = l;
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(quadLine.Point1.X, quadLine.Point1.Y, quadLine.Point1.Z), new THREE.Vector3(quadLine.Point2.X, quadLine.Point2.Y, quadLine.Point2.Z), new THREE.Vector3(quadLine.Point3.X, quadLine.Point3.Y, quadLine.Point3.Z), new THREE.Vector3(quadLine.Point4.X, quadLine.Point4.Y, quadLine.Point4.Z));
                    geometry.applyMatrix(fullMatrix);
                    geometry.faces.push(new THREE.Face3(0, 1, 2));
                    geometry.faces.push(new THREE.Face3(2, 3, 0));
                    geometry.computeFaceNormals();
                    var quadColorCode = quadLine.Color == 16 ? colorCode : quadLine.Color;
                    if (!(quadColorCode in geometries)) {
                        geometries[quadColorCode] = [];
                    }
                    geometries[quadColorCode].push(geometry);
                });
                // Render all triangles
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.Triangle; })
                    .forEach(function (l) {
                    var triLine = l;
                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(triLine.Point1.X, triLine.Point1.Y, triLine.Point1.Z), new THREE.Vector3(triLine.Point2.X, triLine.Point2.Y, triLine.Point2.Z), new THREE.Vector3(triLine.Point3.X, triLine.Point3.Y, triLine.Point3.Z));
                    geometry.applyMatrix(fullMatrix);
                    geometry.faces.push(new THREE.Face3(0, 1, 2));
                    geometry.computeFaceNormals();
                    var triColorCode = triLine.Color == 16 ? colorCode : triLine.Color;
                    if (!(triColorCode in geometries)) {
                        geometries[triColorCode] = [];
                    }
                    geometries[triColorCode].push(geometry);
                });
                // Render all subfiles
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.SubFileReference; })
                    .forEach(function (l) {
                    var subfileLine = l;
                    var useCurrentColor = subfileLine.Color === 16 || subfileLine.Color === 24;
                    var newColorCode = useCurrentColor ? colorCode : subfileLine.Color;
                    LdrawFileRenderer.render(subfileLine.File, newColorCode, fullMatrix.clone().multiply(LdrawFileRenderer.getMatrix4(subfileLine)), geometries);
                });
                return geometries;
            };
            LdrawFileRenderer.getMatrix4 = function (ref) {
                var m = ref.TransformMatrix;
                var newMatrix = new THREE.Matrix4().set(m[0][0], m[0][1], m[0][2], ref.Coordinates.X, m[1][0], m[1][1], m[1][2], ref.Coordinates.Y, m[2][0], m[2][1], m[2][2], ref.Coordinates.Z, 0, 0, 0, 1);
                return newMatrix;
            };
            return LdrawFileRenderer;
        })();
        Renderer.LdrawFileRenderer = LdrawFileRenderer;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LdrawFileRenderer.js.map