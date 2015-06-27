/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />
/// <reference path="./ColorLookup.ts" />

module LdrawVisualizer.Renderer {
	export class LdrawFileRenderer {

		static Render(scene: THREE.Scene,
			ldrawFile: LdrawFile,
			colorCode: number = 0,
			fullMatrix: THREE.Matrix4 = new THREE.Matrix4()) {
			
			// Render all quadrilaterals
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.Quadrilateral)
				.forEach(l => {
					var quadLine = <Parser.Lines.QuadrilateralLine>l;
					var geometry = new THREE.Geometry();

					// var point1Coords = LdrawFileRenderer.applyMatrix(quadLine.Point1, fullMatrix),
					// 	point2Coords = LdrawFileRenderer.applyMatrix(quadLine.Point2, fullMatrix),
					// 	point3Coords = LdrawFileRenderer.applyMatrix(quadLine.Point3, fullMatrix),
					// 	point4Coords = LdrawFileRenderer.applyMatrix(quadLine.Point4, fullMatrix);
					
					// geometry.vertices.push(
					// 	new THREE.Vector3(point1Coords.X, point1Coords.Y, point1Coords.Z),
					// 	new THREE.Vector3(point2Coords.X, point2Coords.Y, point2Coords.Z),
					// 	new THREE.Vector3(point3Coords.X, point3Coords.Y, point3Coords.Z),
					// 	new THREE.Vector3(point4Coords.X, point4Coords.Y, point4Coords.Z)
					// 	);
					
					geometry.vertices.push(
						new THREE.Vector3(quadLine.Point1.X, quadLine.Point1.Y, quadLine.Point1.Z),
						new THREE.Vector3(quadLine.Point2.X, quadLine.Point2.Y, quadLine.Point2.Z),
						new THREE.Vector3(quadLine.Point3.X, quadLine.Point3.Y, quadLine.Point3.Z),
						new THREE.Vector3(quadLine.Point4.X, quadLine.Point4.Y, quadLine.Point4.Z)
						);

					geometry.applyMatrix(fullMatrix);
					geometry.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(-1, -1, 1)));

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.faces.push(new THREE.Face3(2, 3, 0));
					geometry.computeFaceNormals();

					var legoMaterial = new THREE.MeshPhongMaterial({ color: (typeof ColorLookup[colorCode] !== 'undefined' ? ColorLookup[colorCode] : 0), shading: THREE.SmoothShading, side: THREE.DoubleSide });
					var mesh = new THREE.Mesh(geometry, legoMaterial);
					scene.add(mesh);
				});
				
			// Render all triangles
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.Triangle)
				.forEach(l => {
					var triLine = <Parser.Lines.TriangleLine>l;
					var geometry = new THREE.Geometry();

					geometry.vertices.push(
						new THREE.Vector3(triLine.Point1.X, triLine.Point1.Y, triLine.Point1.Z),
						new THREE.Vector3(triLine.Point2.X, triLine.Point2.Y, triLine.Point2.Z),
						new THREE.Vector3(triLine.Point3.X, triLine.Point3.Y, triLine.Point3.Z)
						);
						
					geometry.applyMatrix(fullMatrix);
					geometry.applyMatrix(new THREE.Matrix4().scale(new THREE.Vector3(-1, -1, 1)));

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.computeFaceNormals();

					var legoMaterial = new THREE.MeshPhongMaterial({ color: (typeof ColorLookup[colorCode] !== 'undefined' ? ColorLookup[colorCode] : 0), shading: THREE.SmoothShading, side: THREE.DoubleSide });
					var mesh = new THREE.Mesh(geometry, legoMaterial);
					scene.add(mesh);
				});
				
			// Render all subfiles
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.SubFileReference)
				.forEach(l => {
					var subfileLine = <Parser.Lines.SubFileReferenceLine>l;
					
					if (subfileLine.Filename === '4-4edge.dat') {
						var a = 4;
					}
					
					var newColorCode = subfileLine.Color === 16 || subfileLine.Color === 24 ? colorCode : subfileLine.Color;
					
					var fullMatrixClone = fullMatrix.clone();
					var subFileMatrix = LdrawFileRenderer.getMatrix4(subfileLine);
					var subfileMatrixClone = subFileMatrix.clone(); 
					
					var newFullMatrix = fullMatrixClone.multiply(subfileMatrixClone);

					console.log('Parent matrix for part ' + subfileLine.Filename + ':');
					Utility.logMatrix(fullMatrix);
					console.log('Subfile matrix for part ' + subfileLine.Filename + ':');
					Utility.logMatrix(subFileMatrix);
					console.log('Matrix for part ' + subfileLine.Filename + ':');
					Utility.logMatrix(newFullMatrix);

					LdrawFileRenderer.Render(scene, subfileLine.File, newColorCode, newFullMatrix);
				});
		}

		private static getMatrix4(ref: Parser.Lines.SubFileReferenceLine): THREE.Matrix4 {
			var m = ref.TransformMatrix;

			// var newMatrix = new THREE.Matrix4().set(
			// 	m[0][0], m[0][1], m[0][2], 0,
			// 	m[1][0], m[1][1], m[1][2], 0,
			// 	m[2][0], m[2][1], m[2][2], 0,
			// 	ref.Coordinates.X, ref.Coordinates.Y, ref.Coordinates.Z, 1
			// 	);
			
			var newMatrix = new THREE.Matrix4().set(
				m[0][0], m[0][1], m[0][2], ref.Coordinates.X,
				m[1][0], m[1][1], m[1][2], ref.Coordinates.Y,
				m[2][0], m[2][1], m[2][2], ref.Coordinates.Z,
				0, 0, 0, 1
				);

			return newMatrix;
		}

		// private static applyMatrix(coord: Parser.Coordinates, matrix: THREE.Matrix4): Parser.Coordinates {
		// 	return new Parser.Coordinates(
		// 		matrix.elements[0] * coord.X + matrix.elements[1] * coord.Y + matrix.elements[2] * coord.Z + matrix.elements[3],
		// 		matrix.elements[4] * coord.X + matrix.elements[5] * coord.Y + matrix.elements[6] * coord.Z + matrix.elements[7],
		// 		matrix.elements[8] * coord.X + matrix.elements[9] * coord.Y + matrix.elements[10] * coord.Z + matrix.elements[11]
		// 		);
		// }
	}
}