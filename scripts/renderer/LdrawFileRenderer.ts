/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />

module LdrawVisualizer.Renderer {
	export class LdrawFileRenderer {
		static Render(scene: THREE.Scene, ldrawFile: LdrawFile, translationMatrix?: number[][]) {
			
			// Render all quadrilaterals
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.Quadrilateral)
				.forEach(l => {
					var quadLine = <Parser.Lines.QuadrilateralLine>l;
					var geometry = new THREE.Geometry();
					geometry.vertices.push(
						new THREE.Vector3(quadLine.Point1.X, quadLine.Point1.Y, quadLine.Point1.Z),
						new THREE.Vector3(quadLine.Point2.X, quadLine.Point2.Y, quadLine.Point2.Z),
						new THREE.Vector3(quadLine.Point3.X, quadLine.Point3.Y, quadLine.Point3.Z),
						new THREE.Vector3(quadLine.Point4.X, quadLine.Point4.Y, quadLine.Point4.Z)
						);

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.faces.push(new THREE.Face3(2, 3, 0));
					geometry.computeFaceNormals();

					if (translationMatrix) {
						geometry.applyMatrix(
							new THREE.Matrix4().makeTranslation(
								translationMatrix[0][0],
								translationMatrix[0][1],
								translationMatrix[0][2]
								)
							);
					}
					
					var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.FlatShading, side: THREE.DoubleSide });
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

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.computeFaceNormals();

					if (translationMatrix) {
						geometry.applyMatrix(
							new THREE.Matrix4().makeTranslation(
								translationMatrix[0][0],
								translationMatrix[0][1],
								translationMatrix[0][2]
								)
							);
					}
					
					var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.FlatShading, side: THREE.DoubleSide });
					var mesh = new THREE.Mesh(geometry, legoMaterial);
					scene.add(mesh);
				});
				
			// Render all subfiles
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.SubFileReference)
				.forEach(l => {
					var subfileLine = <Parser.Lines.SubFileReferenceLine>l;
					var newMatrix = translationMatrix ? LdrawFileRenderer.combineTransforms(subfileLine.TransformMatrix, translationMatrix) : subfileLine.TransformMatrix;
					LdrawFileRenderer.Render(scene, subfileLine.File, newMatrix);
				});
		}

		private static combineTransforms(matrix1: number[][], matrix2: number[][]) {
			var m1 = new THREE.Matrix4().set(
				matrix1[0][0], matrix1[0][1], matrix1[0][2], 0,
				matrix1[1][0], matrix1[1][1], matrix1[1][2], 0,
				matrix1[2][0], matrix1[2][1], matrix1[2][2], 0,
				0, 0, 0, 1
				);

			var m2 = new THREE.Matrix4().set(
				matrix2[0][0], matrix2[0][1], matrix2[0][2], 0,
				matrix2[1][0], matrix2[1][1], matrix2[1][2], 0,
				matrix2[2][0], matrix2[2][1], matrix2[2][2], 0,
				0, 0, 0, 1
				);

			return [
				[m1.multiply(m2).elements[0], m1.multiply(m2).elements[1], m1.multiply(m2).elements[2]],
				[m1.multiply(m2).elements[4], m1.multiply(m2).elements[5], m1.multiply(m2).elements[6]],
				[m1.multiply(m2).elements[8], m1.multiply(m2).elements[9], m1.multiply(m2).elements[10]]
			]
		}
	}
}