/// <reference path="../parser/FileService.ts" />
/// <reference path="../parser/LdrawFile.ts" />
/// <reference path="../parser/lines/LineTypes.ts" />

module LdrawVisualizer.Renderer {
	export class LdrawFileRenderer {

		static Render(scene: THREE.Scene, ldrawFile: LdrawFile, translationMatrix?: THREE.Matrix4) {
			
			// Render all quadrilaterals 
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.Quadrilateral)
				.forEach(l => {
					var quadLine = <Parser.Lines.QuadrilateralLine>l;
					var geometry = new THREE.Geometry();

					geometry.vertices.push(
						new THREE.Vector3(quadLine.Point1.X, -quadLine.Point1.Y, quadLine.Point1.Z),
						new THREE.Vector3(quadLine.Point2.X, -quadLine.Point2.Y, quadLine.Point2.Z),
						new THREE.Vector3(quadLine.Point3.X, -quadLine.Point3.Y, quadLine.Point3.Z),
						new THREE.Vector3(quadLine.Point4.X, -quadLine.Point4.Y, quadLine.Point4.Z)
						);

					if (translationMatrix) {
						geometry.applyMatrix(translationMatrix);
					}

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.faces.push(new THREE.Face3(2, 3, 0));
					geometry.computeFaceNormals();

					var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.SmoothShading, side: THREE.DoubleSide });
					var mesh = new THREE.Mesh(geometry, legoMaterial);
					scene.add(mesh);
				});
				
			// Render all triangles
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.Triangle)
				.forEach(l => {
					var triLine = <Parser.Lines.TriangleLine>l;
					var geometry = new THREE.Geometry();

					geometry.vertices.push(
						new THREE.Vector3(triLine.Point1.X, -triLine.Point1.Y, triLine.Point1.Z),
						new THREE.Vector3(triLine.Point2.X, -triLine.Point2.Y, triLine.Point2.Z),
						new THREE.Vector3(triLine.Point3.X, -triLine.Point3.Y, triLine.Point3.Z)
						);

					if (translationMatrix) {
						geometry.applyMatrix(translationMatrix);
					}

					geometry.faces.push(new THREE.Face3(0, 1, 2));
					geometry.computeFaceNormals();

					var legoMaterial = new THREE.MeshPhongMaterial({ color: Math.floor(Math.random() * 16777215), shading: THREE.SmoothShading, side: THREE.DoubleSide });
					var mesh = new THREE.Mesh(geometry, legoMaterial);
					scene.add(mesh);
				});
				
			// Render all subfiles
			ldrawFile.Lines.filter(l => l.LineType === Parser.Lines.LdrawFileLineType.SubFileReference)
				.forEach(l => {
					var subfileLine = <Parser.Lines.SubFileReferenceLine>l;
					var newMatrix = translationMatrix ? LdrawFileRenderer.getMatrix4(subfileLine).multiply(translationMatrix) : LdrawFileRenderer.getMatrix4(subfileLine);
					
					LdrawFileRenderer.Render(scene, subfileLine.File, newMatrix);
				});
		}

		private static getMatrix4(ref: Parser.Lines.SubFileReferenceLine): THREE.Matrix4 {
			var m = ref.TransformMatrix;
			var newMatrix = new THREE.Matrix4().set(
				m[0][0], m[0][1], m[0][2], ref.Coordinates.X,
				m[1][0], m[1][1], m[1][2], -ref.Coordinates.Y,
				m[2][0], m[2][1], m[2][2], ref.Coordinates.Z,
				0, 0, 0, 1
				); 

			return newMatrix;
		}
	}
}