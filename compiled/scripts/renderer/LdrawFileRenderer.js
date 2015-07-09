/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />
/// <reference path="./ColorLookup.ts" />
/// <reference path="./EdgeMap.ts" />
var LdrawVisualizer;
(function (LdrawVisualizer) {
    var Renderer;
    (function (Renderer) {
        var LdrawFileRenderer = (function () {
            function LdrawFileRenderer() {
            }
            LdrawFileRenderer.Render = function (scene, ldconfig, ldrawFiles) {
                var _this = this;
                var startTime = Date.now();
                // TEMPORARY to allow for stud logos
                this.scene = scene;
                // add the ldconfig file to the list of files to be rendered
                ldrawFiles.unshift(ldconfig);
                // render each file provided
                ldrawFiles.forEach(function (ldrawFile) {
                    var partGeometries = _this.render(ldrawFile);
                    // loop through all of the parts
                    partGeometries.forEach(function (geometries) {
                        // for each part, loop through all of colors used in this part.
                        // similarly-colored geometries within a part as rendered as a unit for optimization purposes.
                        // prop is color code
                        for (var prop in geometries) {
                            if (geometries.hasOwnProperty(prop) && prop != 'matrix') {
                                // combine all similarly-colored geometries of this part into a single geometry
                                var combinedGeom = new THREE.Geometry();
                                geometries[prop].forEach(function (g) {
                                    combinedGeom.merge(g, new THREE.Matrix4(), 0);
                                });
                                // create seams
                                var translationVector = new THREE.Vector3();
                                // if (geometries.matrix) {
                                // decompose this matrix into its translation, rotation, and scaling portions
                                geometries.matrix.decompose(translationVector, new THREE.Quaternion(), new THREE.Vector3());
                                // reverse the translation matrix and apply it to the combined geometries,
                                // bringing the part to the origin 
                                translationVector.multiplyScalar(-1);
                                combinedGeom.applyMatrix(new THREE.Matrix4().makeTranslation(translationVector.x, translationVector.y, translationVector.z));
                                // make the part the tiniest bit smaller in order to create seams between the parts
                                combinedGeom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(_this.seamWidthFactor, _this.seamWidthFactor, _this.seamWidthFactor)));
                                // move the part back to its original location
                                translationVector.multiplyScalar(-1);
                                combinedGeom.applyMatrix(new THREE.Matrix4().makeTranslation(translationVector.x, translationVector.y, translationVector.z));
                                // }
                                var color = typeof Renderer.ColorLookup[prop] !== 'undefined' ? Renderer.ColorLookup[prop] : { hex: 0, alpha: 255 };
                                var legoMaterial = new THREE.MeshPhongMaterial({ color: color.hex /*Math.floor(Math.random() * 16777215)*/, shading: THREE.SmoothShading, shininess: 100, specular: 0x000000, side: THREE.DoubleSide });
                                if (color.alpha) {
                                    legoMaterial.transparent = true;
                                    legoMaterial.opacity = color.alpha / 255;
                                }
                                // reverse the X and Y axes to match three.js's axis scheme
                                combinedGeom.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(-1, -1, 1)));
                                // create smooth shading where possible
                                combinedGeom.mergeVertices();
                                //combinedGeom.computeVertexNormals(true);
                                scene.add(new THREE.Mesh(combinedGeom, legoMaterial));
                            }
                        }
                    });
                });
                console.log('Creating three.js model and adding to scene took ' + (Date.now() - startTime) + 'ms');
            };
            LdrawFileRenderer.render = function (ldrawFile, colorCode, fullMatrix, geometries, hasAncestorPart) {
                if (colorCode === void 0) { colorCode = 0; }
                if (fullMatrix === void 0) { fullMatrix = new THREE.Matrix4(); }
                if (geometries === void 0) { geometries = [{}]; }
                if (hasAncestorPart === void 0) { hasAncestorPart = false; }
                var ldrawOrgLine = ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.LDrawOrg; })[0];
                if (ldrawOrgLine
                    && (ldrawOrgLine.PartType === LdrawVisualizer.Parser.Lines.LdrawOrgPartType.Part || ldrawOrgLine.PartType === LdrawVisualizer.Parser.Lines.LdrawOrgPartType.Unofficial_Part)
                    && !hasAncestorPart) {
                    // We're starting a new part, push an empty object onto our list of part geometries
                    // to keep track of this part's contents
                    geometries.push({
                        matrix: fullMatrix
                    });
                    // this flags future parts not to act as their own part, but rather as a subpart - 
                    // they've already been included as a subparent by an ancestor part
                    hasAncestorPart = true;
                }
                // the geometry array we'll be adding to through the rest of this process
                var currentGeometries = geometries[geometries.length - 1];
                // Import all color definitions
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.Colour; })
                    .forEach(function (l) {
                    var colorLine = l;
                    Renderer.ColorLookup[colorLine.Code] = {
                        alpha: colorLine.Alpha,
                        hex: LdrawVisualizer.Utility.hexStringToHexNumber(colorLine.Value.HexValue)
                    };
                });
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
                    if (!(quadColorCode in currentGeometries)) {
                        currentGeometries[quadColorCode] = [];
                    }
                    currentGeometries[quadColorCode].push(geometry);
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
                    if (!(triColorCode in currentGeometries)) {
                        currentGeometries[triColorCode] = [];
                    }
                    currentGeometries[triColorCode].push(geometry);
                });
                // Render all subfiles
                ldrawFile.Lines.filter(function (l) { return l.LineType === LdrawVisualizer.Parser.Lines.LdrawFileLineType.SubFileReference; })
                    .forEach(function (l) {
                    var subfileLine = l;
                    var useCurrentColor = subfileLine.Color === 16 || subfileLine.Color === 24;
                    var newColorCode = useCurrentColor ? colorCode : subfileLine.Color;
                    if (subfileLine.Filename === 'stud.dat') {
                        LdrawFileRenderer.renderStud(subfileLine.File, newColorCode, fullMatrix.clone().multiply(LdrawFileRenderer.getMatrix4(subfileLine)), geometries, hasAncestorPart);
                    }
                    else {
                        LdrawFileRenderer.render(subfileLine.File, newColorCode, fullMatrix.clone().multiply(LdrawFileRenderer.getMatrix4(subfileLine)), geometries, hasAncestorPart);
                    }
                });
                return geometries;
            };
            // replace all studs with a higher-quality cylinder with a logo
            LdrawFileRenderer.renderStud = function (ldrawFile, colorCode, fullMatrix, geometries, hasAncestorPart) {
                if (colorCode === void 0) { colorCode = 0; }
                if (fullMatrix === void 0) { fullMatrix = new THREE.Matrix4(); }
                if (geometries === void 0) { geometries = [{}]; }
                if (hasAncestorPart === void 0) { hasAncestorPart = false; }
                var currentGeometries = geometries[geometries.length - 1];
                // 25 might be overkill, ratchet down in the future if it causes performance issues
                var studGeometry = new THREE.CylinderGeometry(6, 6, 8, 25, 1, false);
                studGeometry.applyMatrix(fullMatrix);
                studGeometry.computeFaceNormals();
                // TEMPORARY way to add logos to studs
                // does weird things with transparent blocks, ignore them for now
                // if (ColorLookup[colorCode] && !ColorLookup[colorCode].alpha) {
                var logoGeometry = new THREE.CircleGeometry(6, 25);
                logoGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(LdrawVisualizer.Utility.degreesToRadians(90)));
                logoGeometry.applyMatrix(new THREE.Matrix4().makeRotationY(LdrawVisualizer.Utility.degreesToRadians(270)));
                logoGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, -4, 0));
                logoGeometry.applyMatrix(fullMatrix);
                logoGeometry.computeFaceNormals();
                logoGeometry.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(-1, -1, 1)));
                var isDev = document.location.hostname === 'localhost' || document.location.hostname === '127.0.0.1';
                var color = typeof Renderer.ColorLookup[colorCode] !== 'undefined' ? Renderer.ColorLookup[colorCode] : { hex: 0, alpha: 255 };
                var logoMaterial = new THREE.MeshPhongMaterial({ normalMap: THREE.ImageUtils.loadTexture(isDev ? '../images/studlogo.png' : './images/studlogo.png'), color: color.hex, shading: THREE.SmoothShading, shininess: 30, side: THREE.DoubleSide });
                // if (color.alpha) {
                // 	logoMaterial.transparent = true;
                // 	logoMaterial.opacity = color.alpha / 255;
                // }
                this.scene.add(new THREE.Mesh(logoGeometry, logoMaterial));
                // }
                if (!(colorCode in currentGeometries)) {
                    currentGeometries[colorCode] = [];
                }
                currentGeometries[colorCode].push(studGeometry);
                return geometries;
            };
            // extracts the transform matrix from the subfile reference line as a THREE.Matrix4
            LdrawFileRenderer.getMatrix4 = function (ref) {
                var m = ref.TransformMatrix;
                var newMatrix = new THREE.Matrix4().set(m[0][0], m[0][1], m[0][2], ref.Coordinates.X, m[1][0], m[1][1], m[1][2], ref.Coordinates.Y, m[2][0], m[2][1], m[2][2], ref.Coordinates.Z, 0, 0, 0, 1);
                return newMatrix;
            };
            // controls how large the seams are between each part.
            // 1.0 = no seams, seems get larger as this number decreases
            LdrawFileRenderer.seamWidthFactor = .993;
            return LdrawFileRenderer;
        })();
        Renderer.LdrawFileRenderer = LdrawFileRenderer;
    })(Renderer = LdrawVisualizer.Renderer || (LdrawVisualizer.Renderer = {}));
})(LdrawVisualizer || (LdrawVisualizer = {}));
//# sourceMappingURL=LdrawFileRenderer.js.map